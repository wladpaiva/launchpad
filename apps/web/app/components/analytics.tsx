// app/providers.tsx
'use client'

import {useEffect} from 'react'
import analytics from '@/lib/analytics'
import {usePathname, useSearchParams} from 'next/navigation'

/**
 * Track page views and other events.
 */
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const url = `${pathname}${query ? `?${query}` : ''}`

  useEffect(() => {
    analytics.page()
  }, [url])

  return <></>
}
