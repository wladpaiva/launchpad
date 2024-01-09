// app/providers.tsx
'use client'

import {useEffect} from 'react'
import analytics from '@/lib/analytics'
import {usePathname, useSearchParams} from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track pageviews
  useEffect(() => {
    analytics.page()
  }, [pathname, searchParams])

  return <></>
}
