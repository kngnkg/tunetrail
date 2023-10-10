import Link from "next/link"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "@/components/icon"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container flex mt-10 sm:mt-0 pt-4 pb-4 justify-between border-solid border-b border-zinc-600 dark:border-zinc-700">
        {/* TODO: コンポーネント化 */}
        <p className="text-lg">TuneTrail</p>
        <div className="flex gap-1">
          <Icon type="search" />
          <Icon type="notify" />
          <Icon type="user" />
          <Icon type="new-post" />
        </div>
      </header>
      <main className="container flex-1">
        {children}
        <Tabs defaultValue="home">
          <TabsList>
            <Link href="/">
              <TabsTrigger value="home">ホーム</TabsTrigger>
            </Link>
            <Link href="/timeline">
              <TabsTrigger value="timeline">タイムライン</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </main>
    </div>
  )
}
