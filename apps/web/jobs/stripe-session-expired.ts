import {stripeTrigger} from '@/lib/stripe-trigger'
import {trigger} from '@/lib/trigger'

if (stripeTrigger) {
  trigger?.defineJob({
    id: 'stripe-session-expired',
    name: 'On checkout session expired',
    enabled: false,
    version: '1.0.0',
    integrations: {
      stripe: stripeTrigger,
    },
    trigger: stripeTrigger.onCheckoutSessionExpired(),
    run: async (payload, io) => {
      // TODO: [Stripe] Occurs when a Checkout Session is expired.
      // Probably you want to send them an email to remind them to pay.
      io.logger.info('Checkout session expired', payload)
    },
  })
}
