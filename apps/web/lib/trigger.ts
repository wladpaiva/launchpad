import {TriggerClient} from '@trigger.dev/sdk'

import {enabled, TRIGGER_API_KEY, TRIGGER_API_URL} from './env.server'

export const trigger = enabled.trigger
  ? new TriggerClient({
      id: 'turboship-web-xhak',
      apiKey: TRIGGER_API_KEY,
      apiUrl: TRIGGER_API_URL,
    })
  : null
