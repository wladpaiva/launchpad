import {auth} from '@/lib/auth'
import {enabled} from '@/lib/env.server'
import {AuthenticationMethod, signInAction} from '@/lib/sign-in'
import {Logo} from '@repo/design-system/components/icons'
import {buttonVariants} from '@repo/design-system/components/ui/button'
import {cn} from '@repo/design-system/lib/utils'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import Link from 'next/link'
import {redirect} from 'next/navigation'

import {UserAuthForm} from '../user-auth-form'

export const metadata: Metadata = {
  title: `Sign up for an account`,
}

export default async function Page() {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  const cookie = cookies().get('usedLastTime')
  const lastUsed = cookie?.value as AuthenticationMethod | undefined

  const enabledOauthProviders = {
    google: enabled.google,
  }
  return (
    <>
      <Link
        href="/signin"
        className={cn(
          buttonVariants({variant: 'ghost'}),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Sign in
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto mb-8 lg:hidden">
            <Logo className="h-12 w-12" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm
          usedLastTime={lastUsed}
          action={signInAction}
          submitLabel="Sign Up with Email"
          {...enabledOauthProviders}
        />
        <p className="px-8 text-center text-sm text-muted-foreground text-balance">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline text-nowrap underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline text-nowrap underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  )
}
