import {log} from '@repo/logger'
import type Stripe from 'stripe'

/**
 * Occurs when a Checkout Session is expired.
 *
 * @param event
 */
export async function stripeSessionExpired(event: Stripe.Event) {
  const payload = event.data.object as Stripe.Checkout.Session

  // TODO: Probably you want to send them an email to remind them to pay.
  log.info('Checkout session expired', payload)
}
