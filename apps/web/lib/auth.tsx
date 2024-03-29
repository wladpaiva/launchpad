import {DrizzleAdapter} from '@auth/drizzle-adapter'
import {db} from '@repo/db'
import {render} from '@repo/email'
import {Template as MagicLinkTemplate} from '@repo/email/templates/magic-link'
import NextAuth, {User as DefaultUser} from 'next-auth'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
import {redirect} from 'next/navigation'

import {resend} from './email'
import {
  BUSINESS_FANTASY_NAME,
  FROM_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  isDevelopment,
} from './env.server'
import {stripe} from './stripe'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      stripeCustomerId?: string
      isActive: boolean
      subscriptionId?: string
    } & DefaultUser
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    stripeCustomerId?: string
    isActive?: boolean
    subscriptionId?: string
  }
}

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/signin',
    verifyRequest: '/verify-email',
    // signOut: "/signout",
    // error: "/error",
    // newUser: "/new-user",
  },
  callbacks: {
    session: ({session, user}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        stripeCustomerId: user.stripeCustomerId,
        isActive: user.isActive,
        subscriptionId: user.subscriptionId,
      },
    }),
  },
  providers: [
    Nodemailer({
      server: {},
      async sendVerificationRequest(params) {
        const rendered = await render(<MagicLinkTemplate link={params.url} />)
        const payload = {
          to: params.identifier,
          from: FROM_EMAIL,
          subject: `Sign in to ${BUSINESS_FANTASY_NAME}`,
          ...rendered,
        }

        if (isDevelopment || !resend) {
          console.log(`   - Magic link:   ${params.url}`)
        }

        resend?.emails.send(payload)
      },
    }),

    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    /**
     * Create user in the stripe customer base
     */
    async createUser({user}) {
      if (stripe) {
        await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id!,
          },
        })
      }
    },
  },
})

/**
 * Require the user to be signed in. \
 * If the user is not signed in, redirect to the sign in page.
 */
export async function requireUser() {
  const session = await auth()

  if (!session || !session.user) {
    // redirect to the sign in page
    redirect('/api/auth/signin')
  }

  return session.user
}
