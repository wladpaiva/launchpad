// `znv` is a library for validating and parsing environment variables
// but it's not currently supporting edge functions.
// see more: https://github.com/lostfictions/znv/issues/2
import {parseEnv, z} from 'bowlingx-znv'

// Validate and parse environment variables using zod.
// https://www.npmjs.com/package/znv
export const {} = parseEnv(process.env, {
  DATABASE_URL: z.string().min(1).url(),
})
