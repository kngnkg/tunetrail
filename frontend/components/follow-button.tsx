"use client"

import { User } from "@/types"

import { Button } from "./ui/button"

interface FollowButtonProps {
  user: User
  variant?: "default" | "link"
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  variant = "default",
}) => {
  return (
    <>
      {user.followed ? (
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
