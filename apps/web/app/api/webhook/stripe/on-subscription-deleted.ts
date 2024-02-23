import {updateUser} from '@repo/db'
import type Stripe from 'stripe'

/**
 * Occurs whenever a customer's subscription ends.
 *
 * @param event
 */
export async function onSubscriptionDeleted(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Subscription

  await updateUser(payload.customer as string, {
    isActive: false,
  })
}
