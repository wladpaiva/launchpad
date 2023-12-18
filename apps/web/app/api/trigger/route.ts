import {trigger} from '@/lib/trigger'
import {createAppRoute} from '@trigger.dev/nextjs'

import '@/jobs'

//this route is used to send and receive data with Trigger.dev
export const {POST, dynamic} = trigger
  ? createAppRoute(trigger)
  : {
      POST: () => {
        return new Response(
          JSON.stringify({
            error: 'Trigger.dev is not enabled',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            status: 500,
          },
        )
      },
      dynamic: 'force-dynamic',
    }

//uncomment this to set a higher max duration (it must be inside your plan limits). Full docs: https://vercel.com/docs/functions/serverless-functions/runtimes#max-duration
//export const maxDuration = 60;
