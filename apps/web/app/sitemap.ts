import {BASE_URL} from '@/lib/env'

export default async function sitemap() {
  let routes = [''].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
