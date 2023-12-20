"use client"

import { User } from "@/types"

import { env } from "@/env.mjs"
import { useUsers } from "@/hooks/users/use-users"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserList } from "@/components/users/user-list"

interface UserListDialogProps {
  type: "followers" | "followees"
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
        <ScrollArea className="w-full h-4/6 p-6 pt-16 border-t border-zinc-700 dark:border-zinc-700">
          <UserList
            endpoint={`${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}/${type}`}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
