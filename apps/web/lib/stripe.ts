import Stripe from 'stripe'

import {enabled, STRIPE_SECRET_KEY} from './env.server'

/**
 * Payment gateway for processing payments.
 */
export const stripe = enabled.stripe
  ? new Stripe(STRIPE_SECRET_KEY!, {
      typescript: true,
      apiVersion: '2023-10-16',
    })
  : null
