"use client"

import { useRouter } from "next/navigation"
import { LoginUser } from "@/types"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { ReviewFormData } from "@/lib/validations/review"

import { ReviewForm } from "./review-form"

interface NewReviewFormProps {
  user: Pick<LoginUser, "username">
}

export const NewReviewForm: React.FC<NewReviewFormProps> = ({
  user,
}: NewReviewFormProps) => {
  const onSubmit = async (data: ReviewFormData) => {
    console.log(`new review data:${data}`)
    try {
      //   新規レビューを作成する
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}/reviews`,
        {
          method: "POST",
          body: JSON.stringify({
            albumId: data.albumId,
            title: data.title,
            content: JSON.stringify(data.content),
            publishedStatus: data.publishedStatus,
          }),
        }
      )

      if (!resp) {
        throw new Error("レビューの作成に失敗しました")
      }
    } catch (e) {
      console.error(e)
      alert("レビューの作成に失敗しました")
    }
  }

  return <ReviewForm onSubmit={onSubmit} />
}
