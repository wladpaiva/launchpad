import {PrismaAdapter} from '@auth/prisma-adapter'
import {render} from '@repo/email'
import {Template as MagicLinkTemplate} from '@repo/email/jsx/transactional-magic-link'
import NextAuth, {User as DefaultUser} from 'next-auth'
import Email from 'next-auth/providers/email'
import Google from 'next-auth/providers/google'
import {redirect} from 'next/navigation'

import {resend} from './email'
import {
  BUSINESS_FANTASY_NAME,
  FROM_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  isDevelopment,
} from './env.server'
import {prisma} from './prisma'
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
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: "/auth/new-user",
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
    Email({
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
            userId: user.id,
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
