import {prisma} from '@/lib/prisma'
import {stripeTrigger} from '@/lib/stripe-trigger'
import {trigger} from '@/lib/trigger'

if (stripeTrigger) {
  trigger?.defineJob({
    id: 'stripe-subscription-created',
    name: 'Save user`s subscription id when customer signs up for a new plan',
    enabled: false,
    version: '1.0.0',
    integrations: {
      stripe: stripeTrigger,
    },
    trigger: stripeTrigger.onCustomerSubscriptionCreated(),
    run: async (payload, io) => {
      // TODO: [Stripe] Occurs whenever a customer is signed up for a new plan.

      await io.runTask(
        'update-user',
        () =>
          prisma.user.update({
            where: {
              stripeCustomerId: payload.customer as string,
            },
            data: {
              isActive: true,
              subscriptionId: payload.id,
            },
          }),
        {name: 'Update User'},
      )
    },
  })
}
