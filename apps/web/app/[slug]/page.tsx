// PROMPT

// You are a marketing specialist.  Your job is to help me create a copy that will sit in a waitlist landing page.

// This is the information about the project:

// Value (USP): faster recovery app
// How: using AI
// Who: crossfit athletes

// Using the AIDA framework, rewrite the following copy to fit the new copy

// <h1 className="relative z-10 text-3xl xs:text-4xl md:text-6xl text-center mb-4">
//           <span className="font-semibold">Good things come to those</span>{' '}
//           <span className="font-serif">who wait</span>.
//         </h1>
//         <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10 mb-8">
//           Launch your very own waitlist, grow your mailing list all while
//           building the hype for launch day.
//         </p>

// Keep it concise. Just do, no talk. Copy:

import React from 'react'
import {Highlight} from '@/components/highlight'
import {NEXT_PUBLIC_URL} from '@/lib/env.server'
import {db} from '@repo/db'
import {Mark} from '@repo/design-system/components/icons'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {BackgroundBeams} from './background-beams'
import {InterestForm} from './form'

type PageProps = {params: {slug: string}}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const waitlist = await getWaitlist(params.slug)
  if (!waitlist) {
    return
  }

  return {
    title: 'Express your interest',
    openGraph: {
      title: waitlist.slug || undefined,
      description: waitlist.description || undefined,
      type: 'website',
      url: `${NEXT_PUBLIC_URL}/${waitlist.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: waitlist.slug || undefined,
      description: waitlist.description || undefined,
    },
  }
}
export default async function Page({params}: PageProps) {
  const waitlist = await getWaitlist(params.slug)

  if (!waitlist) {
    return notFound()
  }

  return (
    <div className="h-100dvh w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 text-balance">
        <span className="font-serif font-semibold" />

        <div className="flex gap-2 items-center justify-center mb-10">
          <Mark className="w-6 h-6 text-primary" />
          <span className="font-black">Indie</span>
        </div>

        <h1
          className="relative z-10 text-3xl xs:text-4xl md:text-6xl text-center mb-4"
          dangerouslySetInnerHTML={{__html: waitlist.title || ''}}
        />
        <p
          className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10 mb-8"
          dangerouslySetInnerHTML={{__html: waitlist.description || ''}}
        />

        <InterestForm waitlist={params.slug} />

        <p className="text-center mt-10 text-muted-foreground text-sm">
          Made by{' '}
          <Highlight className="text-foreground italic">
            Certified Crossfit Trainers
          </Highlight>
        </p>
      </div>
      <BackgroundBeams className="hidden md:block" />
    </div>
  )
}
async function getWaitlist(slug: string) {
  return await db.query.waitlist.findFirst({
    where: (waitlist, {eq}) => eq(waitlist.slug, slug),
  })
}
