'use server'

import {signIn} from '@/lib/auth'
import {z} from 'zod'

const schema = z
  .object({
    oauth: z.enum(['google', 'github', 'twitter', 'facebook']),
  })
  .or(
    z.object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
    }),
  )
  .and(
    z.object({
      redirectTo: z.string().url(),
    }),
  )

export async function signInAction(prevState: any, formData: FormData) {
  const parse = schema.safeParse({
    email: formData.get('email'),
    oauth: formData.get('oauth'),
    redirectTo: formData.get('redirectTo'),
  })

  if (!parse.success) {
    return parse.error.flatten()
  }

  if ('oauth' in parse.data) {
    await signIn(parse.data.oauth, formData)
  }

  await signIn('email', formData)
}
