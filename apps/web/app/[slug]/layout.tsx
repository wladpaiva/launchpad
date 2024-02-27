import {db} from '@repo/db'
import {notFound} from 'next/navigation'

import {CustomPixel} from './custom-pixel'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {slug: string}
}) {
  const waitlist = await db.query.waitlist.findFirst({
    where: (waitlist, {eq}) => eq(waitlist.slug, params.slug),
    columns: {pixel: true},
  })

  if (!waitlist) {
    return notFound()
  }

  return (
    <>
      {waitlist.pixel && <CustomPixel id={waitlist.pixel} />}
      {children}
    </>
  )
}
