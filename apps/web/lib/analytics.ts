import googleAnalytics from '@analytics/google-analytics'
import {originalSourcePlugin} from '@analytics/original-source-plugin'
import postHog from '@metro-fs/analytics-plugin-posthog'
import Analytics from 'analytics'

import facebookPixelPlugin from './analytics-facebook'

// What type of env are we in?
const IS_DEV_ENV = process.env.NODE_ENV === 'development'
const IS_PROD_ENV = process.env.NODE_ENV === 'production'

// IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const FACEBOOK_PIXEL = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL
const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_API_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

// Create a dev only plugin for debugging
type analyticFn = {payload: any}
function printConsole(event: string, payload: any) {
  console.log('\x1b[33m%s\x1b[0m', '[analytics.ts]', '\n', event, payload)
}

const devOnlyPlugins = [
  {
    name: 'logger',
    page: ({payload}: analyticFn) => {
      printConsole('pageview', payload)
    },
    track: ({payload}: analyticFn) => {
      printConsole('track', payload)
    },
    identify: ({payload}: analyticFn) => {
      printConsole('identify', payload)
    },
  },
]

// prod only plugins
const prodOnlyPlugins = []

if (GA_MEASUREMENT_ID) {
  prodOnlyPlugins.push(
    googleAnalytics({
      measurementIds: [GA_MEASUREMENT_ID],
    }),
  )
}

if (FACEBOOK_PIXEL) {
  prodOnlyPlugins.push(
    facebookPixelPlugin({
      pixelId: FACEBOOK_PIXEL,
    }),
  )
}

if (POSTHOG_TOKEN) {
  prodOnlyPlugins.push(
    postHog({
      token: POSTHOG_TOKEN,
      enabled: true,
      options: {
        api_host: POSTHOG_API_HOST,
        persistence: 'memory',
        disable_cookie: true,
        disable_session_recording: true,
      },
    }),
  )
}

/* Initialize analytics */
const analytics = Analytics({
  plugins: [
    originalSourcePlugin(),
    ...(IS_DEV_ENV ? devOnlyPlugins : []),
    ...(IS_PROD_ENV ? prodOnlyPlugins : []),
  ],
})

export default analytics
