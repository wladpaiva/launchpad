import {updateUser} from '@repo/db'
import type Stripe from 'stripe'

/**
 * Occurs whenever a customer is signed up for a new plan.
 *
 * @param event
 */
export async function onSubscriptionCreated(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Subscription

  await updateUser(payload.customer as string, {
    isActive: true,
    subscriptionId: payload.id,
  })
}
