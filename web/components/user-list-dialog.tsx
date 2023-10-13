"use client"

import { User } from "@/types"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserListDialogProps {
  type: "followers" | "following"
  user: User
}

export const UserListDialog: React.FC<UserListDialogProps> = ({
  type,
  user,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        {type === "followers" ? (
          <p>{user.followersCount} フォロワー</p>
        ) : (
          <p>{user.followersCount} フォロー中</p>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
