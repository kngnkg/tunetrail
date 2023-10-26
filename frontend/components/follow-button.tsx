"use client"

import { User } from "@/types"

import { Button } from "./ui/button"

interface FollowButtonProps {
  user: Pick<User, "userId">
  following: boolean
  variant?: "default" | "link"
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  following,
  variant = "default",
}) => {
  // TODO: フォロー・フォロー解除の処理を書く
  return (
    <>
      {following ? (
        <Button
          variant={variant}
          size="sm"
          className={variant === "link" ? "text-primary dark:text-primary" : ""}
        >
          フォロー中
        </Button>
      ) : (
        <Button
          variant={variant}
          size="sm"
          className={variant === "link" ? "text-primary dark:text-primary" : ""}
        >
          フォローする
        </Button>
      )}
    </>
  )
}
