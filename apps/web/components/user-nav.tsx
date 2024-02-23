import {requireUser, signOut} from '@/lib/auth'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar'
import {Button} from '@repo/design-system/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu'
import {cn} from '@repo/design-system/lib/utils'
import Link from 'next/link'

const getInitials = (name: string) => {
  const names = name.split(' ')
  let initials = ''
  names.forEach(n => {
    initials += n[0]
  })
  return initials.toUpperCase().slice(0, 2)
}

export async function UserNav() {
  const user = await requireUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className={cn('h-8 w-8')}>
            <AvatarImage src={user.image || ''} alt="@shadcn" />
            <AvatarFallback>
              {getInitials(user.name || user.email || '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex flex-col space-y-1">
              {user.name && (
                <p className="text-sm font-medium leading-none">{user.name}</p>
              )}
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/subscription">Subscription & Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <form
          action={async () => {
            'use server'
            await signOut({
              redirectTo: '/',
            })
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
