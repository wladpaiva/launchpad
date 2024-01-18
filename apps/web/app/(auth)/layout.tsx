import {BUSINESS_FANTASY_NAME} from '@/lib/env.server'
import {Logo} from '@repo/design-system/components/icons'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="container relative px-4 grid h-[100dvh] flex-col items-center justify-center max-w-[100vw] md:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="mr-2 h-6 w-6" />
          {BUSINESS_FANTASY_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* TODO: add prompt for copy */}
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">{children}</div>
    </div>
  )
}
