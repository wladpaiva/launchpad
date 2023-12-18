'use client'

import {forwardRef} from 'react'
import {useFormStatus} from 'react-dom'

import {Spinner} from './icons'
import {Button, ButtonProps} from './ui/button'

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'aria-disabled'>

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({children, ...rest}, ref) => {
    const {pending} = useFormStatus()

    return (
      <Button
        {...rest}
        disabled={pending}
        type="submit"
        aria-disabled={pending}
        ref={ref}
      >
        {pending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    )
  },
)
SubmitButton.displayName = 'SubmitButton'

export {SubmitButton}
