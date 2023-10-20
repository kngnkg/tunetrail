import { MainNav } from "@/components/main-nav"
import { MenuTab, MenuTabs } from "@/components/menu-tabs"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const tabs: MenuTab[] = [
    { label: "ホーム", value: "home", href: "/" },
    { label: "タイムライン", value: "timeline", href: "/timeline" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <MenuTabs tabs={tabs} />
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
