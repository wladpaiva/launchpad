import {requireUser, signOut} from '@/lib/auth'
import {Button} from '@repo/design-system/components/ui/button'

export default async function Page() {
  const user = await requireUser()

  return (
    <main>
      <p className="mb-2">apps/web/app/page.tsx</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <form
        action={async () => {
          'use server'
          await signOut()
        }}
        className="w-full"
      >
        <Button>Sign Out</Button>
      </form>
    </main>
  )
}
