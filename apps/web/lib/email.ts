import {Resend as ResendTrigger} from '@trigger.dev/resend'
import {Resend} from 'resend'

import {enabled, RESEND_API_KEY} from './env'

/**
 * Email service for sending transactional emails.
 */
export const resend = enabled.resend ? new Resend(RESEND_API_KEY) : null

/**
 * Trigger.dev integration for sending transactional emails.
 */
export const resendTrigger = enabled.resend
  ? new ResendTrigger({
      id: 'resend',
      apiKey: RESEND_API_KEY,
    })
  : null
