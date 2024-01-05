import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { MenuTab, MenuTabs } from "@/components/menu-tabs"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const loginUser = await getCurrentUser()
  if (!loginUser) {
    return notFound()
  }

  const tabs: MenuTab[] = [
    { label: "アカウント", value: "account", href: "/settings/account" },
    { label: "プロフィール", value: "profile", href: "/settings/profile" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <MainNav />
      </Header>
      <main className="container flex-1">
        <div className="sm:w-4/6 mx-auto"></div>
        <MenuTabs tabs={tabs} defaultValue="profile" />
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
