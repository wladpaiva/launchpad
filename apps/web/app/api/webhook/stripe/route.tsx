import {STRIPE_WEBHOOK_SECRET} from '@/lib/env.server'
import {stripe} from '@/lib/stripe'
import {log} from '@repo/logger'
import {NextRequest, NextResponse} from 'next/server'
import type Stripe from 'stripe'

import {stripeSessionCompleted} from './stripe-session-completed'
import {stripeSessionExpired} from './stripe-session-expired'
import {stripeSubscriptionCreated} from './stripe-subscription-created'
import {stripeSubscriptionDeleted} from './stripe-subscription-deleted'

export const POST = async (req: NextRequest) => {
  if (!stripe) {
    log.error(`[Stripe] Stripe is not initialized!`)
    return new Response('Stripe is not initialized!', {
      status: 500,
    })
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    log.error(`[Stripe] Webhook secret is not set!`)
    return new Response('Webhook secret is not set!', {
      status: 500,
    })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event: Stripe.Event

  log.info('[Stripe] Processing webhook')

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig as string,
      STRIPE_WEBHOOK_SECRET,
    )

    log.info(`[Stripe] Listening to Webhook Event!`, {type: event.type})
  } catch (err) {
    log.error(err)
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    })
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await stripeSessionCompleted(event)
        break
      case 'checkout.session.expired':
        await stripeSessionExpired(event)
        break
      case 'customer.subscription.created':
        await stripeSubscriptionCreated(event)
        break
      case 'customer.subscription.deleted':
        await stripeSubscriptionDeleted(event)
        break
      default:
        // Unexpected event type
        log.warn(event.type, `🤷‍♀️ Unhandled event type`)
        break
    }
  } catch (err) {
    log.error(`[Stripe] Webhook Error`, {err})
    return new Response('Webhook handler failed. View logs.', {
      status: 400,
    })
  }

  log.info(`[Stripe] Successfully ran Webhook!`)

  return NextResponse.json({success: true})
}
