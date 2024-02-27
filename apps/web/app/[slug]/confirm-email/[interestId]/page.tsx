import {Highlight} from '@/components/highlight'
import {NEXT_PUBLIC_URL} from '@/lib/env.server'
import {db, eq} from '@repo/db'
import {interest} from '@repo/db/schema'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {Share} from './share'

export const metadata: Metadata = {
  title: `Thank you for confirming your interest!`,
}

export default async function Page({
  params,
}: {
  params: {slug: string; interestId: string}
}) {
  const interested = await db.query.interest.findFirst({
    where: (interest, {eq}) => eq(interest.id, params.interestId),
  })

  if (!interested) {
    notFound()
  }

  if (!interested.emailVerified) {
    await db
      .update(interest)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(interest.id, params.interestId))
  }

  return (
    <div className="h-100dvh w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <Highlight className="mb-2 text-xs">{interested.email}</Highlight>
      <h1 className="relative z-10 text-3xl xs:text-4xl md:text-6xl text-center mb-4 font-semibold">
        Email confirmed!
      </h1>

      <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10 mb-8">
        Share your excitement with your community and let them know about this
        amazing opportunity.
      </p>

      <Share url={`${NEXT_PUBLIC_URL}/${params.slug}`} />
    </div>
  )
}
