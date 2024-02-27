'use server'

import {resend} from '@/lib/email'
import {FROM_EMAIL, isDevelopment} from '@/lib/env.server'
import {db} from '@repo/db'
import {interest} from '@repo/db/schema'
import {render} from '@repo/email'
import {Template as ConfirmEmailTemplate} from '@repo/email/jsx/confirm-email'
import {headers} from 'next/headers'
import {z} from 'zod'

const schema = z.object({
  email: z.string().email({message: 'Please enter a valid email address.'}),
  waitlist: z.string(),
})

export async function expressInterest(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    waitlist: formData.get('waitlist'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {data} = validatedFields

  const existingInterest = await db.query.interest.findFirst({
    where: (interest, {eq}) => eq(interest.email, data.email),
  })

  if (existingInterest) {
    return {
      errors: {
        email: ['You have already expressed interest.'],
      },
    }
  }

  // Get the waitlist id based on the unique slug column
  const waitlist = await db.query.waitlist.findFirst({
    where: (waitlist, {eq}) => eq(waitlist.slug, data.waitlist),
  })
  if (!waitlist) {
    return {
      errors: {
        email: ['Invalid waitlist.'],
      },
    }
  }

  // Insert the new interest into the database
  const insertedInterest = await db
    .insert(interest)
    .values({
      waitlist: waitlist.id,
      email: data.email,
    })
    .returning({
      id: interest.id,
    })
    .get()

  // Send the confirmation email
  const headersList = headers()
  const referer = headersList.get('referer') as string
  const link = `${referer}/confirm-email/${insertedInterest.id}`
  const rendered = await render(<ConfirmEmailTemplate link={link} />)
  const payload = {
    to: data.email,
    from: FROM_EMAIL,
    subject: `[Please confirm] A Quick Thank You`,
    ...rendered,
  }

  if (isDevelopment || !resend) {
    console.log(` - Confirmation link:   ${link}`)
  }
  resend?.emails.send(payload)

  return {
    success: true,
  }
}
