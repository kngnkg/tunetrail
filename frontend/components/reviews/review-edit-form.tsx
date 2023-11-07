"use client"

import { LoginUser, Review } from "@/types"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { ReviewFormData } from "@/lib/validations/review"

import { ReviewForm } from "./review-form"

interface ReviewEditFormProps {
  user: Pick<LoginUser, "username">
  initialReview: Review
}

export const ReviewEditForm: React.FC<ReviewEditFormProps> = ({
  user,
  initialReview,
}: ReviewEditFormProps) => {
  const onSubmit = async (data: ReviewFormData) => {
    try {
      //   レビューを更新する
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}/reviews/${initialReview.reviewId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            albumId: data.albumId,
            title: data.title,
            content: data.content,
            publishedStatus: data.publishedStatus,
          }),
        }
      )

      if (!resp) {
        throw new Error("レビューの更新に失敗しました")
      }
    } catch (e) {
      console.error(e)
      alert("レビューの更新に失敗しました")
    }
  }

  return <ReviewForm initialReview={initialReview} onSubmit={onSubmit} />
}
