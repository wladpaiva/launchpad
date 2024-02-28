import {track} from '@/lib/nextjs-facebook-conversions-api'

export default function Page() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 sm:my-32">
        Edit me at{' '}
        <code className="font-mono rounded bg-muted px-1.5">
          apps/web/app/(marketing)/page.tsx
        </code>
      </div>

      <form
        action={async () => {
          'use server'

          await track('TestEvent', {
            currency: 'USD',
            value: 100,
          })

          console.log('🔥 ~ foi')
        }}
      >
        <button type="submit">Track</button>
      </form>

      {/* <Hero /> */}
    </>
  )
}
