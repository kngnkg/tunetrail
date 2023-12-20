"use client"

import * as React from "react"
import { User } from "@/types"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
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
  const {
    data: isFollowing,
    error,
    mutate,
    isLoading,
  } = useFollow(user.username)

  // TODO: ログイン状態でなければフォローできないようにする
  const onClickFollow = async () => {
    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}/following`,
        {
          method: "POST",
          body: JSON.stringify({
            immutableId: user.immutableId,
          }),
        }
      )

      if (!resp) {
        throw new Error("フォローに失敗しました")
      }

      mutate()
    } catch (e) {
      alert("フォローに失敗しました")
    }
  }

  const onClickUnfollow = async () => {
    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}/following`,
        {
          method: "DELETE",
          body: JSON.stringify({
            immutableId: user.immutableId,
          }),
        }
      )

      if (!resp) {
        throw new Error("フォロー解除に失敗しました")
      }

      mutate()
    } catch (e) {
      alert("フォロー解除に失敗しました")
    }
  }

  return (
    <>
      {isFollowing ? (
        <Button
          onClick={onClickUnfollow}
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
          onClick={onClickFollow}
          variant={variant}
          size="sm"
          className={
            variant === "link"
              ? "text-xs text-primary dark:text-primary"
              : "text-xs"
          }
        >
          フォローする
        </Button>
      )}
    </>
  )
}
