'use client'

import {forwardRef} from 'react'
import {useFormStatus} from 'react-dom'

import {cn} from '../lib/utils'
import {Spinner} from './icons'
import {Button, ButtonProps} from './ui/button'

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'aria-disabled'>

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({children, className, ...rest}, ref) => {
    const {pending} = useFormStatus()

    return (
      <Button
        {...rest}
        disabled={pending}
        type="submit"
        aria-disabled={pending}
        ref={ref}
        className={cn('relative', className)}
      >
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-4 w-4 animate-spin" />
          </div>
        )}
        <div className={cn(pending ? 'opacity-0' : 'contents')}>{children}</div>
      </Button>
    )
  },
)
SubmitButton.displayName = 'SubmitButton'

export {SubmitButton}
