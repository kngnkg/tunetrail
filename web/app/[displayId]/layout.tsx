import { notFound } from "next/navigation"

import { env } from "@/env.mjs"
import { getUser } from "@/lib/get-user"
import { FollowButton } from "@/components/follow-button"
import { GenreList } from "@/components/genre-list"
import { MainNav } from "@/components/main-nav"
import { MenuTab, MenuTabs } from "@/components/menu-tabs"
import { UserAvatar } from "@/components/user-avatar"
import { UserListDialog } from "@/components/user-list-dialog"

interface UserLayoutProps {
  params: { displayId: string }
  children: React.ReactNode
}

export default async function UserLayout({
  params,
  children,
}: UserLayoutProps) {
  const displayId = decodeURIComponent(params.displayId)
  const user = await getUser(`${env.API_ROOT}/users?display_id=${displayId}`)

  if (!user) {
    notFound()
  }

  const tabs: MenuTab[] = [
    { label: "レビュー", value: "reviews", href: `/${displayId}` },
    {
      label: "いいね",
      value: "likes",
      href: `/${displayId}/likes`,
    },
    {
      label: "コメント",
      value: "comments",
      href: `/${displayId}/comments`,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <div className="sm:w-4/6 mx-auto">
          {/* ユーザー情報 */}
          <div className="m-8 flex gap-12">
            <UserAvatar user={user} className="sm:w-36 sm:h-36" />
            {/* ユーザー名とフォローボタン */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-16 items-center">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {user.displayId}
                  </p>
                </div>
                <FollowButton user={user} />
              </div>
              {/* フォロー関連 */}
              <div className="flex gap-4 items-center">
                <UserListDialog type="followers" user={user} />
                <UserListDialog type="following" user={user} />
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">{user.bio}</p>
              </div>
              {/* ジャンル一覧 */}
              <div className="flex flex-col gap-1">
                <p>フォロー中のジャンル</p>
                {user.followingGenres.length === 0 ? (
                  <p>まだジャンルをフォローしていません。</p>
                ) : (
                  <GenreList genres={user.followingGenres} />
                )}
              </div>
            </div>
          </div>
        </div>
        <MenuTabs tabs={tabs} />
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
