import {auth, signOut} from '@/lib/auth'
import {Button} from '@repo/design-system/components/ui/button'

export default async function Page() {
  const session = await auth()

  return (
    <main>
      hey
      {session?.user && (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
          className="w-full"
        >
          <Button>Sign Out</Button>
        </form>
      )}
    </main>
  )
}
