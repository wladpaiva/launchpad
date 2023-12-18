'use client'

import * as React from 'react'
import {SubmitButton} from '@repo/design-system/components/forms'
import {AlertCircle, Google} from '@repo/design-system/components/icons'
import {Alert, AlertDescription} from '@repo/design-system/components/ui/alert'
import {Button} from '@repo/design-system/components/ui/button'
import {Input} from '@repo/design-system/components/ui/input'
import {Label} from '@repo/design-system/components/ui/label'
import {cn} from '@repo/design-system/lib/utils'
import {useSearchParams} from 'next/navigation'
import {useFormState} from 'react-dom'

import {signInAction} from './actions'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  action: typeof signInAction
  google: boolean
  submitLabel: string
}

export function UserAuthForm({
  className,
  google,
  action,
  submitLabel,
  ...props
}: UserAuthFormProps) {
  const [state, formAction] = useFormState(action, undefined)
  const searchParams = useSearchParams()

  const oauthProviders = []

  if (google) {
    oauthProviders.push(
      <Button variant="outline" type="submit" name="oauth" value="google">
        <Google className="mr-2 h-4 w-4" />
        Google
      </Button>,
    )
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {state?.fieldErrors.email?.length && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state?.fieldErrors.email?.[0]}</AlertDescription>
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
