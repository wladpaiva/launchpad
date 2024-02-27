import {NEXT_PUBLIC_URL} from '@/lib/env.server'

export default async function sitemap() {
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
