'use server'

import {cookies} from 'next/headers'
import {z} from 'zod'

import {signIn} from './auth'

const INTEGRATED_PROVIDERS = ['google'] as const
export type AuthenticationMethod =
  | (typeof INTEGRATED_PROVIDERS)[number]
  | 'email'

const schema = z
  .object({
    oauth: z.enum(INTEGRATED_PROVIDERS),
  })
  .or(
    z.object({
      email: z.string().min(1, 'Email is required').email('Invalid email'),
    }),
  )
  .and(
    z.object({
      redirectTo: z.string().url().or(z.literal('')),
    }),
  )

/**
 * Sign in the user with the given `formData`.
 * Used by the sign in and sign up pages.
 */
export async function signInAction(prevState: any, formData: FormData) {
  const parse = schema.safeParse({
    email: formData.get('email'),
    oauth: formData.get('oauth'),
    redirectTo: formData.get('redirectTo'),
  })

  if (!parse.success) {
    return parse.error.flatten()
  }

  if ('oauth' in parse.data) {
    saveLastUsed(parse.data.oauth)
    await signIn(parse.data.oauth, formData)
  }

  saveLastUsed('email')
  await signIn('email', formData)
}

/** Store the last used method of authentication */
function saveLastUsed(method: AuthenticationMethod) {
  cookies().set('usedLastTime', method)
}
