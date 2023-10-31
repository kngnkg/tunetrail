"use client"

import { User } from "@/types"

import { env } from "@/env.mjs"
import { useUsers } from "@/hooks/use-users"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserList } from "@/components/user-list"

interface UserListDialogProps {
  type: "followers" | "following"
  user: Pick<
    User,
    | "username"
    | "immutableId"
    | "displayName"
    | "avatarUrl"
    | "followersCount"
    | "followingCount"
  >
}

export const UserListDialog: React.FC<UserListDialogProps> = ({
  type,
  user,
}) => {
  const { users, isError, isLoading } = useUsers({
    endpoint: `${env.NEXT_PUBLIC_MOCK_API_ROOT}/users/${user.username}/${type}`,
  })

  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        {type === "followers" ? (
          <>{user.followersCount} フォロワー</>
        ) : (
          <>{user.followingCount} フォロー中</>
        )}
      </DialogTrigger>
      <DialogContent className="h-4/6 flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {type === "followers" ? <>フォロワー</> : <>フォロー中</>}
          </DialogTitle>
        </DialogHeader>
        {/* ユーザー一覧 */}
        <div className="">
          {users.length === 0 ? (
            <>
              {type === "followers" ? (
                <p>フォロワーはいません。</p>
              ) : (
                <p>フォロー中のユーザーはいません。</p>
              )}
            </>
          ) : (
            <>
              <ScrollArea className="w-full h-4/6 p-6 pt-16 border-t border-zinc-700 dark:border-zinc-700">
                <UserList
                  users={users}
                  isLoading={isLoading}
                  isError={isError}
                />
              </ScrollArea>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
