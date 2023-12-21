import {resendTrigger} from '@/lib/email'
import {FROM_EMAIL} from '@/lib/env'
import {trigger} from '@/lib/trigger'
import {eventTrigger} from '@trigger.dev/sdk'
import {z} from 'zod'

trigger?.defineJob({
  id: 'resend-send-email',
  name: 'Resend: send email',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'send.email',
    schema: z.object({
      to: z.union([z.string(), z.array(z.string())]),
      subject: z.string(),
      text: z.string(),
      html: z.string().optional(),
    }),
  }),

  integrations: resendTrigger
    ? {
        resend: resendTrigger,
      }
    : undefined,
  run: async (payload, io) => {
    if (!io.resend) {
      io.logger.warn('Resend is not configured.')
      return
    }

    await io.resend.emails.send('📧', {
      from: FROM_EMAIL,
      ...payload,
    })
  },
})
