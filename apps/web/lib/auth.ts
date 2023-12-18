import {PrismaAdapter} from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Google from 'next-auth/providers/google'
import {redirect} from 'next/navigation'

import {EMAIL_FROM, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from './env'
import {prisma} from './prisma'

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
      from: EMAIL_FROM,
      sendVerificationRequest(params) {
        console.log('👉 login magic link')
        console.log(`👉 ${params.url}`)
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
