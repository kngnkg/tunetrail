import { notFound } from "next/navigation"
import { getReview } from "@/service/review/get-review"

import { env } from "@/env.mjs"
import { ReviewForm } from "@/components/reviews/review-form"

interface EditorPageProps {
  params: { reviewId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  // TODO: 認証済みユーザー専用のエンドポイントを作る
  const review = await getReview(`${env.API_ROOT}/reviews/${params.reviewId}`)

  if (!review) {
    notFound()
  }

  return (
    <>
      <section>
        <ReviewForm review={review} />
      </section>
    </>
  )
}
