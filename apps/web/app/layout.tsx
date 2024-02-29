import {Suspense} from 'react'
import {
  BUSINESS_FANTASY_NAME,
  GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_URL,
} from '@/lib/env.server'
import {Toaster} from '@repo/design-system/components/ui/toaster'
import {cn} from '@repo/design-system/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {
  Inter as FontSans,
  Instrument_Serif as FontSerif,
} from 'next/font/google'

import {Analytics} from './components/analytics'
import {Providers} from './components/providers'
import {TailwindIndicator} from './components/tailwind-indicator'

import '@repo/design-system/reset.css'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = FontSerif({
  style: 'italic',
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_URL),
  title: {
    default: BUSINESS_FANTASY_NAME,
    template: `%s | ${BUSINESS_FANTASY_NAME}`,
  },
  description:
    'A waitlist app to help people launch their products faster and start building a community online.',
  alternates: {
    canonical: NEXT_PUBLIC_URL,
  },
  openGraph: {
    title: BUSINESS_FANTASY_NAME,
    description:
      'A waitlist app to help people launch their products faster and start building a community online.',
    url: NEXT_PUBLIC_URL,
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
          'min-h-dvh bg-background font-sans antialiased',
          fontSans.variable,
          fontSerif.variable,
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
        <Toaster />
      </body>
    </html>
  )
}
