import { MainNav } from "@/components/main-nav"

interface ReviewLayoutProps {
  children: React.ReactNode
}

export default function ReviewLayout({ children }: ReviewLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-10/12 sm:mx-auto">{children}</div>
      </main>
    </div>
  )
}
