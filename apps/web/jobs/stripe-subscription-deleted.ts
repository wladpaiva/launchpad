import {prisma} from '@/lib/prisma'
import {stripeTrigger} from '@/lib/stripe-trigger'
import {trigger} from '@/lib/trigger'

if (stripeTrigger) {
  trigger?.defineJob({
    id: 'stripe-subscription-deleted',
    name: 'Deactivate user when customer subscription ends',
    version: '1.0.0',
    integrations: {
      stripe: stripeTrigger,
    },
    trigger: stripeTrigger.onCustomerSubscriptionDeleted(),
    run: async (payload, io) => {
      // TODO: [Stripe] This is where you know that a customer's subscription ends.

      await io.runTask(
        'deactivate-user',
        () =>
          prisma.user.update({
            where: {
              stripeCustomerId: payload.customer as string,
            },
            data: {
              isActive: false,
            },
          }),
        {name: 'Deactivate User'},
      )
    },
  })
}
