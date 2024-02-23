import {NEXT_PUBLIC_URL} from '@/lib/env.server'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${NEXT_PUBLIC_URL}/sitemap.xml`,
    host: NEXT_PUBLIC_URL,
  }
}
