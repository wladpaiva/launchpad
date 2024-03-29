export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {children}
    </div>
  )
}
