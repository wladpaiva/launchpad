import {Footer} from '@/components/sections/footer'
import {UserNav} from '@/components/user-nav'
import {auth} from '@/lib/auth'
import {Logo, Mark} from '@repo/design-system/components/icons'
import {Button} from '@repo/design-system/components/ui/button'
import Link from 'next/link'

import MainNav from './components/main-nav'

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await auth()
  const user = session?.user

  return (
    <div className="px-4 py-6 relative">
      <div className="mx-auto max-w-2xl p-2 w-full rounded-full border-border/40 border flex items-center justify-between bg-black font-bold text-sm text-foreground/90 shadow-2xl sticky top-4 z-1 shadow-black">
        <Link href="/" className="px-4 flex items-center">
          <Logo className="w-auto h-8 -ml-2 hidden sm:inline" />
          <Mark className="w-auto h-8 -ml-2 sm:hidden" />
        </Link>
        <MainNav />

        {user ? (
          <UserNav />
        ) : (
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  )
}
