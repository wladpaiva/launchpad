import {Resend} from 'resend'

import {enabled, RESEND_API_KEY} from './env.server'

/**
 * Email service for sending transactional emails.
 */
export const resend = enabled.resend ? new Resend(RESEND_API_KEY) : null
