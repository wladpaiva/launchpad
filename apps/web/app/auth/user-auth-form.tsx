'use client'

import * as React from 'react'
import {AuthenticationMethod, signInAction} from '@/lib/sign-in'
import {SubmitButton} from '@repo/design-system/components/forms'
import {AlertCircle, Google} from '@repo/design-system/components/icons'
import {Alert, AlertDescription} from '@repo/design-system/components/ui/alert'
import {Button} from '@repo/design-system/components/ui/button'
import {Input} from '@repo/design-system/components/ui/input'
import {Label} from '@repo/design-system/components/ui/label'
import {cn} from '@repo/design-system/lib/utils'
import {useSearchParams} from 'next/navigation'
import {useFormState} from 'react-dom'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  action: typeof signInAction
  google: boolean
  submitLabel: string
  usedLastTime?: AuthenticationMethod
}

export function UserAuthForm({
  className,
  action,
  google,
  submitLabel,
  usedLastTime,
  ...props
}: UserAuthFormProps) {
  const [state, formAction] = useFormState(action, undefined)
  const searchParams = useSearchParams()

  const error = state?.fieldErrors.email?.[0]
    ? {
        field: state?.fieldErrors.email?.[0],
      }
    : searchParams.get('error')
      ? {
          nextAuthCode: searchParams.get('error'),
        }
      : null

  const oauthProviders = []

  if (google) {
    oauthProviders.push(
      <>
        <Button variant="outline" type="submit" name="oauth" value="google">
          <Google className="mr-2 h-4 w-4" />
          Google
        </Button>
        {usedLastTime === 'google' && <UsedLastTime />}
      </>,
    )
  }

  return (
    <div className={cn('grid gap-6 relative', className)} {...props}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {'field' in error
              ? error.field
              : error.nextAuthCode === 'OAuthAccountNotLinked'
                ? 'You have already signed in with a different provider'
                : 'Something went wrong, please try again later.'}
          </AlertDescription>
        </Alert>
      )}

      <form action={formAction}>
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('callbackUrl') ?? ''}
        />
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <SubmitButton>{submitLabel}</SubmitButton>
        </div>
        {usedLastTime === 'email' && <UsedLastTime />}
      </form>

      {oauthProviders.length > 0 && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form action={formAction} className="grid gap-2">
            <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get('callbackUrl') ?? ''}
            />
            {oauthProviders.map((provider, i) => (
              <React.Fragment key={i}>{provider}</React.Fragment>
            ))}
          </form>
        </>
      )}
    </div>
  )
}

function UsedLastTime() {
  return (
    <div className="relative">
      <div className="mt-1 sm:absolute -right-18 -top-24 text-xs sm:w-15 text-center italic font-light text-muted-foreground">
        used last time
        <div className="relative m-2 hidden sm:block">
          <div className="absolute -left-5">
            <svg
              width="62"
              height="70"
              viewBox="0 0 62 70"
              fill="none"
              className="fill-muted-foreground h-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.10018 65.8998C1.00018 66.4998 0.900181 67.8998 1.60018 67.8998C9.90018 68.1998 18.2002 68.8998 26.4002 69.9998C27.2002 70.0998 27.7002 68.9999 27.9002 68.2999C28.0002 67.7999 28.3002 66.1998 27.4002 66.0998C20.1002 65.0998 12.8002 64.4998 5.50018 64.1998C16.9002 60.5998 28.5002 56.8998 38.5002 50.1998C43.1002 47.0998 47.4002 43.3998 50.9002 39.0998C54.8002 34.2998 57.5002 28.7998 59.1002 22.8998C61.0002 15.7998 61.4002 8.39985 60.8002 1.19985C60.8002 0.599845 60.4002 -0.300156 59.7002 0.199844C59.0002 0.699844 58.6002 1.89984 58.7002 2.79984C59.1002 8.69984 59.0002 14.7998 57.7002 20.5998C56.5002 25.9998 54.3002 30.8998 50.9002 35.2998C44.1002 43.9998 34.4002 49.7998 24.4002 53.8998C19.0002 56.0998 13.5002 57.8998 7.90018 59.6998C10.6002 55.6998 12.6002 51.1998 13.8002 46.4998C13.9002 45.8998 14.1002 44.5998 13.3002 44.2998C12.5002 44.0998 12.0002 45.4998 11.8002 45.9998C10.2002 52.4998 6.70018 58.3998 1.70018 63.0998C1.10018 63.6998 0.800181 64.9999 1.00018 65.7999C1.00018 65.7999 1.00018 65.8998 1.10018 65.8998Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
