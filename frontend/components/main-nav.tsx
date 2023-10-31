import Link from "next/link"

import { Icon } from "@/components/icon"

interface MainNavProps {
  className?: string
}

export const MainNav: React.FC<MainNavProps> = ({ className }) => {
  return (
    <div className="flex justify-between pt-4 pb-4">
      <Link href="/">
        <p className="text-lg">TuneTrail</p>
      </Link>
      {/* TODO: ログイン状態によって表示を変える */}
      <div className="flex gap-4 items-center">
        <Link href="/search">
          <Icon type="search" />
        </Link>
        <Icon type="notify" />
        <Link href="/userpage">
          <Icon type="user" className="w-8 h-8" />
        </Link>
        <Link href="/editor/new">
          <Icon
            type="new-post"
            className="text-primary dark:text-primary w-8 h-8"
          />
        </Link>
      </div>
    </div>
  )
}
