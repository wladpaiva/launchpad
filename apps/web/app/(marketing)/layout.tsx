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
    <div className="relative">
      <div className="px-2 sticky top-4 z-1">
        <div className="mx-auto max-w-2xl p-2 w-full rounded-full border-border/40 border flex items-center justify-between bg-black font-bold text-sm text-foreground/90 shadow-2xl shadow-black">
          <Link href="/" className="flex items-center h-8 w-8">
            <Logo className="hidden sm:inline" />
            <Mark className="sm:hidden" />
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
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  )
}
