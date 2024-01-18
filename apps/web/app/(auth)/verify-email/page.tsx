import {CheckCircle} from '@repo/design-system/components/icons'

export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Check your email
        </h1>
        <p>A magic link has been sent to your email.</p>
        <p className="text-xs text-muted-foreground">
          If you do not receive an email within 5 minutes, please try again.
        </p>
      </div>
    </div>
  )
}
