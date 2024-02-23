import {prisma} from '@/lib/prisma'
import type Stripe from 'stripe'

/**
 * Occurs whenever a customer is signed up for a new plan.
 *
 * @param event
 */
export async function stripeSubscriptionCreated(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Subscription

  await prisma.user.update({
    where: {
      stripeCustomerId: payload.customer as string,
    },
    data: {
      isActive: true,
      subscriptionId: payload.id,
    },
  })
}
