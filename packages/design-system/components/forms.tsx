'use client'

import {forwardRef} from 'react'
import {useFormStatus} from 'react-dom'

import {Spinner} from './icons'
import {Button, ButtonProps} from './ui/button'

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'aria-disabled'> & {
  /** Icon which will be replaced by the spinner */
  icon?: React.ReactNode
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({children, icon, ...rest}, ref) => {
    const {pending} = useFormStatus()

    return (
      <Button
        {...rest}
        disabled={pending}
        type="submit"
        aria-disabled={pending}
        ref={ref}
      >
        {pending ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : icon}
        {children}
      </Button>
    )
  },
)
SubmitButton.displayName = 'SubmitButton'

export {SubmitButton}
