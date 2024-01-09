import googleAnalytics from '@analytics/google-analytics'
import {originalSourcePlugin} from '@analytics/original-source-plugin'
import Analytics from 'analytics'

import facebookPixelPlugin from './analytics-facebook'

// What type of env are we in?
const IS_DEV_ENV = process.env.NODE_ENV === 'development'
const IS_PROD_ENV = process.env.NODE_ENV === 'production'

// IDs
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
export const FACEBOOK_PIXEL = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL

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

/* Initialize analytics */
const analytics = Analytics({
  plugins: [
    originalSourcePlugin(),
    ...(IS_DEV_ENV ? devOnlyPlugins : []),
    ...(IS_PROD_ENV ? prodOnlyPlugins : []),
  ],
})

export default analytics
