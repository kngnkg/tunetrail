"use client"

import * as React from "react"
import { User } from "@/types"

import { useFollow } from "@/hooks/follows/use-follow"

import { Button } from "./ui/button"

interface FollowButtonProps {
  user: Pick<User, "username" | "immutableId">
  variant?: "default" | "link"
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  variant = "default",
}) => {
  const { data: isFollowing, error, isLoading } = useFollow(user.username)

  // TODO: フォロー・フォロー解除の処理を書く
  // 該当のユーザーネームをフォローしているかどうかを確認する
  // ログイン状態でなければフォローできないようにする

  return (
    <>
      {isFollowing ? (
        <Button
          variant={variant}
          size="sm"
          className={
            variant === "link"
              ? "text-zinc-300 dark:text-zinc-300"
              : "border dark:border-zinc-700 text-zinc-200 dark:text-zinc-200 bg-background dark:bg-background"
          }
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
