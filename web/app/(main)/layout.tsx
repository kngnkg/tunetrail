import { Icon } from "@/components/icons"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container flex h-20 mt-10 justify-between border-solid border-1 dark:border-white">
        <p className="text-lg">TuneTrail</p>
        <div className="flex gap-1">
          <Icon type="search" />
          <Icon type="notify" />
          <Icon type="user" />
          <Icon type="new-post" />
        </div>
      </header>
      <main className="container flex-1">{children}</main>
    </div>
  )
}
