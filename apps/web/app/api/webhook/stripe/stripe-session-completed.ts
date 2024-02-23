import {signIn} from '@/lib/auth'
import {prisma} from '@/lib/prisma'
import {stripe} from '@/lib/stripe'
import type Stripe from 'stripe'

/**
 * Occurs when a Checkout Session has been successfully completed.
 *
 * 1. If the user exists, mark them as paid.
 * 2. If the user doesn't exist, create a new user and customer.
 * 3. Send a login link to the user.
 *
 * @param event
 */
export async function stripeSessionCompleted(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Checkout.Session

  // Basically user's can buy without being logged in
  // so we need to check if there's a user with the same email.
  // If there is, we need to mark the user as paid.
  // If there isn't, we need to create a new user and customer
  // for them.
  let user = await prisma.user.upsert({
    where: {
      stripeCustomerId: (payload.customer as string) || '',
      OR: [
        {
          email: payload.customer_details?.email,
        },
      ],
    },

    // Update the user if they already exist
    update: {
      isActive: true,
    },

    // or create a new user if they don't
    create: {
      name: payload.customer_details?.name,
      email: payload.customer_details?.email,
      isActive: true,
    },

    select: {
      name: true,
      email: true,
      id: true,
      stripeCustomerId: true,
    },
  })

  if (!user.stripeCustomerId) {
    await stripe?.customers.create({
      email: user.email || undefined,
      name: user.name || undefined,
      metadata: {
        userId: user.id,
      },
    })
  }

  await signIn('nodemailer', {email: user.email, redirect: false})
}
