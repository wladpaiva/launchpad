'use client'

import {useEffect, useRef} from 'react'
import analytics from '@/lib/analytics'
import {SubmitButton} from '@repo/design-system/components/forms'
import {Input} from '@repo/design-system/components/ui/input'
import {Label} from '@repo/design-system/components/ui/label'
import {useToast} from '@repo/design-system/components/ui/use-toast'
import {cn} from '@repo/design-system/lib/utils'
import {useFormState} from 'react-dom'

import {expressInterest} from './action'

const initialState = {
  errors: {
    email: [],
  },
}

export function InterestForm({waitlist}: {waitlist: string}) {
  const ref = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(expressInterest, initialState)
  const toast = useToast()

  useEffect(() => {
    if (state?.success) {
      toast?.toast({
        title: 'Congratulations!',
        description:
          "You'll be notified when we're live. In the meantime, check out your inbox for a confirmation email.",
      })
      ref.current?.reset()
      analytics.track('expressed-interest')
    }
  }, [state])

  return (
    <form
      ref={ref}
      action={formAction}
      className="relative z-10 max-w-md mx-auto"
    >
      <input type="hidden" name="waitlist" value={waitlist} />
      <Label htmlFor="email" className="sr-only">
        Email
      </Label>
      <Input
        type="text"
        id="email"
        name="email"
        required
        placeholder="Your Email Address"
        className={cn(
          'placeholder:text-muted-foreground pr-30.5 bg-background h-13',
          {
            'border-red-500': state?.errors?.email?.length,
          },
        )}
      />
      {state?.errors?.email?.length ? (
        <p aria-live="polite" className="text-red-700 text-sm mt-2 ml-3">
          {state?.errors?.email}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground  mt-2 text-center">
          We'll never share your info with anyone.
        </p>
      )}
      <SubmitButton className="absolute right-1.5 top-1.5 rounded-sm">
        Join Waitlist
      </SubmitButton>
    </form>
  )
}
