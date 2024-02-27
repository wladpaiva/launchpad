// app/providers.tsx
'use client'

import {useEffect} from 'react'
import analytics from '@/lib/analytics'

export function Analytics() {
  useEffect(() => {
    // Track pageviews
    analytics.page()
  }, [])

  return <></>
}
