'use client'

import React from 'react'
import {posthog} from '@/lib/posthog'
import {PostHogProvider as PostHogProviderBase} from 'posthog-js/react'

export function PostHogProvider({children}: {children: React.ReactNode}) {
  return <PostHogProviderBase client={posthog}>{children}</PostHogProviderBase>
}
