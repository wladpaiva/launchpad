import {signIn} from '@/lib/auth'
import {prisma} from '@/lib/prisma'
import {stripeTrigger} from '@/lib/stripe-trigger'
import {trigger} from '@/lib/trigger'

if (stripeTrigger) {
  trigger?.defineJob({
    id: 'stripe-session-completed',
    name: 'On checkout session completed',
    version: '1.0.0',
    integrations: {
      stripe: stripeTrigger,
    },
    trigger: stripeTrigger.onCheckoutSessionCompleted(),
    run: async (payload, io, ctx) => {
      // TODO: [Stripe] Occurs when a Checkout Session has been successfully completed.
      // Tipically you would want to update the database here.

      // Basically user's can buy without being logged in
      // so we need to check if there's a user with the same email.
      // If there is, we need to mark the user as paid.
      // If there isn't, we need to create a new user and customer
      // for them.

      let user = await io.runTask(
        'upsert-user',
        () =>
          prisma.user.upsert({
            where: {
              stripeCustomerId: (payload.customer as string) || '',
              OR: [
                {
                  email: payload.customer_details?.email,
                },
              ],
            },

            // Update the user if they already exist
            update: {
              isActive: true,
            },

            // or create a new user if they don't
            create: {
              name: payload.customer_details?.name,
              email: payload.customer_details?.email,
              isActive: true,
            },

            select: {
              name: true,
              email: true,
              id: true,
              stripeCustomerId: true,
            },
          }),
        {name: 'Update or Create User for Stripe Customer'},
      )

      if (!user.stripeCustomerId) {
        await io.logger.info(
          `User wasn't logged in during purchase so we need to create a Stripe Customer for them.`,
        )

        await io.stripe.createCustomer('creaet-customer', {
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id,
          },
        })
      }

      await io.runTask(
        'send-magic-link',
        async () => {
          await signIn('email', {email: user.email, redirect: false})
        },
        {
          name: 'Send Magic Link',
        },
      )
    },
  })
}
