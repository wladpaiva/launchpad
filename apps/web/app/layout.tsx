import {Suspense} from 'react'
import {
  BASE_URL,
  BUSINESS_FANTASY_NAME,
  GOOGLE_SITE_VERIFICATION,
} from '@/lib/env.server'
import {cn} from '@repo/design-system/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {Inter as FontSans} from 'next/font/google'

import {Analytics} from './components/analytics'
import {Providers} from './components/providers'
import {TailwindIndicator} from './components/tailwind-indicator'

import '@repo/design-system/reset.css'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: BUSINESS_FANTASY_NAME,
    template: `%s | ${BUSINESS_FANTASY_NAME}`,
  },
  description:
    'A boilerplate to help people ship code faster and start making money online super quickly.',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: BUSINESS_FANTASY_NAME,
    description:
      'A boilerplate to help people ship code faster and start making money online super quickly.',
    url: BASE_URL,
    siteName: BUSINESS_FANTASY_NAME,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: BUSINESS_FANTASY_NAME,
    card: 'summary_large_image',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className="scrollbar-stable">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <TailwindIndicator />
        </Providers>
        <Suspense>
          <Analytics />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
