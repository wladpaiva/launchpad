import {prisma} from '@/lib/prisma'
import {stripeTrigger} from '@/lib/stripe-trigger'
import {trigger} from '@/lib/trigger'

if (stripeTrigger) {
  trigger?.defineJob({
    id: 'stripe-customer-created',
    name: 'On Stripe customer created',
    version: '1.0.0',
    integrations: {
      stripe: stripeTrigger,
    },
    trigger: stripeTrigger.onCustomerCreated(),
    run: async (payload, io) => {
      // TODO: [Stripe] Occurs whenever a new customer is created.
      await io.runTask(
        'link-user-stripe-customer',
        () =>
          prisma.user.update({
            where: {id: payload.metadata.userId},
            data: {
              stripeCustomerId: payload.id,
            },
          }),
        {name: 'Link our User to Stripe Customer'},
      )
    },
  })
}
