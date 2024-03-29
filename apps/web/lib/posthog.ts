'use client'

import posthog from 'posthog-js'

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV !== 'development' &&
  POSTHOG_KEY
) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually. See analytics.tsx.
  })
}

export {posthog}
