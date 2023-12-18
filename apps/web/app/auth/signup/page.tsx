import {
  BUSINESS_FANTASY_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '@/lib/env'
import {buttonVariants} from '@repo/design-system/components/ui/button'
import {cn} from '@repo/design-system/lib/utils'
import {Metadata} from 'next'
import Link from 'next/link'

import {signInAction} from '../actions'
import {UserAuthForm} from '../user-auth-form'

export const metadata: Metadata = {
  title: `Sign up for an account - ${BUSINESS_FANTASY_NAME}`,
}

export default function Page() {
  const enabledOauthProviders = {
    google: !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET),
  }
  return (
    <>
      <Link
        href="/auth/signin"
        className={cn(
          buttonVariants({variant: 'ghost'}),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Sign in
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm
          action={signInAction}
          submitLabel="Sign Up with Email"
          {...enabledOauthProviders}
        />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  )
}
