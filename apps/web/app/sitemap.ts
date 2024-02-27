import {NEXT_PUBLIC_URL} from '@/lib/env.server'
import type {MetadataRoute} from 'next'

// export const revalidate = 3600 // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let routes = [
    '/',
    '/signin',
    '/signup',
    '/privacy-policy',
    '/terms-of-service',
  ].map(route => ({
    url: `${NEXT_PUBLIC_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
