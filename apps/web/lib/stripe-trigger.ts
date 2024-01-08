// 🚨 This normally would sit on the `stripe.ts` file, but we're putting it here
// because `@trigger.dev/stripe` is using an old version of `stripe` package.
// We'll update it soon.
import {Stripe as StripeTrigger} from '@trigger.dev/stripe'

import {enabled, STRIPE_SECRET_KEY} from './env.server'

/**
 * Trigger.dev integration for processing payments.
 *
 */
export const stripeTrigger = enabled.stripe
  ? new StripeTrigger({
      id: 'stripe',
      apiKey: STRIPE_SECRET_KEY,
    })
  : null
