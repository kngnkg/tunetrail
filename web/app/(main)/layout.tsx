import Link from "next/link"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const tabsTriggerClassName =
    "data-[state=active]:border-b-4 border-primary dark:border-primary rounded-none focus-visible:ring-none"

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <Tabs defaultValue="home" className="sm:w-4/6 mx-auto">
          <TabsList className="bg-transparent dark:bg-transparent">
            <Link href="/">
              <TabsTrigger value="home" className={tabsTriggerClassName}>
                ホーム
              </TabsTrigger>
            </Link>
            <Link href="/timeline">
              <TabsTrigger value="timeline" className={tabsTriggerClassName}>
                タイムライン
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
