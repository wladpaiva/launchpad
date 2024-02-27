import {NEXT_PUBLIC_URL} from '@/lib/env.server'
import {db} from '@repo/db'

export default async function sitemap() {
  let staticRoutes = [
    '/',
    // '/signin',
    // '/signup',
    // '/privacy-policy',
    // '/terms-of-service',
  ].map(route => ({
    url: `${NEXT_PUBLIC_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const waitlists = await db.query.waitlist.findMany()

  const dynamicRoutes = [
    ...waitlists.map(waitlist => ({
      url: `${NEXT_PUBLIC_URL}/${waitlist.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
