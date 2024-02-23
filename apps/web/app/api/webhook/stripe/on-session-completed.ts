import {signIn} from '@/lib/auth'
import {db} from '@repo/db'
import {users} from '@repo/db/schema'
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
export async function onSessionCompleted(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Checkout.Session

  // Basically user's can buy without being logged in
  // so we need to check if there's a user with the same email.
  // If there is, we need to mark the user as paid.
  // If there isn't, we need to create a new user and customer
  // for them.
  let user = await db
    .insert(users)
    .values({
      name: payload.customer_details?.name!,
      email: payload.customer_details?.email!,
      stripeCustomerId: payload.customer as string,
      isActive: true,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        isActive: true,
      },
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      stripeCustomerId: users.stripeCustomerId,
    })
    .get()

  await signIn('nodemailer', {email: user.email, redirect: false})
}
