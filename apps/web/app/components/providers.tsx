import React from 'react'

import {PostHogProvider} from './posthog-provider'
import {ThemeProvider} from './theme-provider'

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PostHogProvider>{children}</PostHogProvider>
    </ThemeProvider>
  )
}
