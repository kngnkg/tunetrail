"use client"

import { Review, User } from "@/types"
import { useSession } from "next-auth/react"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { useLike } from "@/hooks/likes/use-like"

import { Icon } from "../icon"

interface LikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  review: Pick<Review, "reviewId" | "likesCount">
  loginUser?: Pick<User, "username" | "immutableId">
  className?: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  review,
  loginUser,
  className,
  ...props
}) => {
  const {
    data: isLiked,
    error,
    mutate,
    isLoading,
  } = useLike({
    username: loginUser ? loginUser.username : "",
    reviewId: review.reviewId,
  })

  // TODO: ログイン状態でなければいいねできないようにする
  const onClickLike = async () => {
    if (!loginUser) return

    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${loginUser.username}/likes`,
        {
          method: "POST",
          body: JSON.stringify({
            reviewId: review.reviewId,
          }),
        }
      )

      if (!resp) {
        throw new Error("いいねに失敗しました")
      }

      mutate()
    } catch (e) {
      alert("いいねに失敗しました")
    }
  }

  const onClickUnlike = async () => {
    if (!loginUser) return

    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${loginUser.username}/likes/${review.reviewId}`,
        {
          method: "DELETE",
        }
      )

      if (!resp) {
        throw new Error("いいね解除に失敗しました")
      }

      mutate()
    } catch (e) {
      alert("いいね解除に失敗しました")
    }
  }

  return (
    <div className="flex gap-0.5 items-center">
      {isLiked ? (
        <Icon
          onClick={onClickUnlike}
          type={"filled-like"}
          className="h-6 w-6"
        />
      ) : (
        <Icon onClick={onClickLike} type={"like"} className="h-6 w-6" />
      )}
      <span>{review.likesCount}</span>
    </div>
  )
}
