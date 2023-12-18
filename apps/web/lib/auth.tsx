import {PrismaAdapter} from '@auth/prisma-adapter'
import {render} from '@repo/email'
import {Template as MagicLinkTemplate} from '@repo/email/jsx/transactional-magic-link'
import NextAuth from 'next-auth'
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
} from './env'
import {prisma} from './prisma'
import {trigger} from './trigger'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
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

        if (trigger) {
          await trigger.sendEvent({
            name: 'send.email',
            payload,
          })
          return
        }

        resend?.emails.send(payload)
      },
    }),

    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
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
