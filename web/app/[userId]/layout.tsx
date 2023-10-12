import { MainNav } from "@/components/main-nav"

interface UserLayoutProps {
  children: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        {children}
      </main>
    </div>
  )
}
