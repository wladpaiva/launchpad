import {auth} from '@/lib/auth'
import {BUSINESS_FANTASY_NAME} from '@/lib/env.server'
import {Logo} from '@repo/design-system/components/icons'
import Link from 'next/link'
import {redirect} from 'next/navigation'

export default async function Page() {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full grid h-[100dvh] flex-col items-center justify-center">
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="relative z-20 flex items-center mb-4 mx-auto text-lg font-medium">
              <Logo className="mr-2 h-6 w-6" />
              {BUSINESS_FANTASY_NAME}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Obrigado for your purchase!
            </h1>
            <p className="">
              Now, check your email. We've sent you a magic link for you to
              authenticate in our system.
            </p>
            <p className="text-xs text-muted-foreground">
              If you do not receive an email within 5 minutes, please try to
              sign in <Link href="/auth/signin">here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
