import Link from 'next/link'

export default function MainNav() {
  return (
    <nav className="flex gap-4 text-foreground">
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/blog"
      >
        Blog
      </Link>
    </nav>
  )
}
