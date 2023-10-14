import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"

interface SearchLayoutProps {
  children: React.ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto mt-12">
          <Search />
          {children}
        </div>
      </main>
    </div>
  )
}
