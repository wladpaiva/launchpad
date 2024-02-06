import {BASE_URL} from '@/lib/env.server'

export default async function sitemap() {
  let routes = ['/', '/signin', '/signup'].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
