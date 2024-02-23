import {prisma} from '@/lib/prisma'
import type Stripe from 'stripe'

/**
 * Occurs whenever a customer's subscription ends.
 *
 * @param event
 */
export async function stripeSubscriptionDeleted(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Subscription

  await prisma.user.update({
    where: {
      stripeCustomerId: payload.customer as string,
    },
    data: {
      isActive: false,
    },
  })
}
