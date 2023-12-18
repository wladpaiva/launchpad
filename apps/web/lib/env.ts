// `znv` is a library for validating and parsing environment variables
// but it's not currently supporting edge functions.
// see more: https://github.com/lostfictions/znv/issues/2
import {parseEnv, z} from 'bowlingx-znv'

// Validate and parse environment variables using zod.
// https://www.npmjs.com/package/znv
export const {
  BUSINESS_FANTASY_NAME,

  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,

  RESEND_API_KEY,
  EMAIL_FROM,
} = parseEnv(process.env, {
  DATABASE_URL: z.string().min(1).url(),
  BUSINESS_FANTASY_NAME: z.string().min(1),

  NEXTAUTH_URL: z.string().min(1).url(),
  NEXTAUTH_SECRET: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: {
    schema: z.string().min(1).email(),
    defaults: {
      _: 'onboarding@resend.dev',
    },
  },
})
