import {BASE_URL} from '@/lib/env'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
