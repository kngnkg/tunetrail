import { notFound } from "next/navigation"
import { toUser } from "@/service/transform"
import getUserByUsername from "@/service/user/get-user"
import { User } from "@/types"

import { FollowButton } from "@/components/follow-button"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { MenuTab, MenuTabs } from "@/components/menu-tabs"
import { UserAvatar } from "@/components/user-avatar"
import { UserListDialog } from "@/components/users/user-list-dialog"

interface UserLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

const getUser = async (username: string): Promise<User | null> => {
  try {
    const resp = await getUserByUsername(username)
    if (!resp) {
      return null
    }

    return toUser(resp)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function UserLayout({
  params,
  children,
}: UserLayoutProps) {
  const username = decodeURIComponent(params.username)
  const user = await getUser(username)

  if (!user) {
    notFound()
  }

  const tabs: MenuTab[] = [
    { label: "レビュー", value: "reviews", href: `/${username}` },
    {
      label: "いいね",
      value: "likes",
      href: `/${username}/likes`,
    },
    {
      label: "コメント",
      value: "comments",
      href: `/${username}/comments`,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <MainNav />
      </Header>
      <main className="container flex-1">
        <div className="sm:w-4/6 mx-auto">
          {/* ユーザー情報 */}
          <div className="m-8 flex gap-12">
            <UserAvatar user={user} className="sm:w-36 sm:h-36" />
            {/* ユーザー名とフォローボタン */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-16 items-center">
                <div>
                  <h1 className="text-2xl font-bold">{user.displayName}</h1>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {user.username}
                  </p>
                </div>
                <FollowButton user={user} following={false} />
              </div>
              {/* フォロー関連 */}
              <div className="flex gap-4 items-center">
                <UserListDialog type="followers" user={user} />
                <UserListDialog type="following" user={user} />
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">{user.bio}</p>
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
