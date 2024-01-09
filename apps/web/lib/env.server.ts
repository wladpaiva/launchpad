// `znv` is a library for validating and parsing environment variables
// but it's not currently supporting edge functions.
// see more: https://github.com/lostfictions/znv/issues/2
import {parseEnv, z} from 'bowlingx-znv'

import 'server-only'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isVercel = process.env.VERCEL

export const BASE_URL =
  `https://${process.env.VERCEL_URL}` || 'http://localhost:3000'

// Validate and parse environment variables using zod.
// https://www.npmjs.com/package/znv
export const {
  BUSINESS_FANTASY_NAME,

  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_SITE_VERIFICATION,

  RESEND_API_KEY,
  FROM_EMAIL,

  TRIGGER_API_KEY,
  TRIGGER_API_URL,

  STRIPE_SECRET_KEY,
} = parseEnv(process.env, {
  DATABASE_URL: z.string().min(1).url(),
  BUSINESS_FANTASY_NAME: z.string().min(1),

  NEXTAUTH_URL: isVercel ? z.string().optional() : z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),

  RESEND_API_KEY: isProduction ? z.string().min(1) : z.string().optional(),
  FROM_EMAIL: isProduction ? z.string().min(1) : z.string(),

  TRIGGER_API_KEY: z.string().optional(),
  TRIGGER_API_URL: z.string().optional(),

  STRIPE_SECRET_KEY: z.string().optional(),
})

/**
 * Whether or not the app is configured to use certain features.
 */
export const enabled = {
  google: !!GOOGLE_CLIENT_ID && !!GOOGLE_CLIENT_SECRET,
  resend: !!RESEND_API_KEY,
  trigger: !!TRIGGER_API_KEY && !!TRIGGER_API_URL,
  stripe: !!STRIPE_SECRET_KEY,
}
