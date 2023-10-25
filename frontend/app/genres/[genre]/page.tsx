import { getReviews } from "@/service/review/get-reviews"

import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

interface GenrePageProps {
  params: { genre: string }
}

export default async function GenrePage({ params }: GenrePageProps) {
  const reviews = await getReviews(
    `${env.MOCK_API_ROOT}/reviews?genre=${params.genre}`
  )

  if (!reviews) {
    return <p>Something went wrong...</p>
  }

  return (
    <>
      <section>
        {reviews.length === 0 ? (
          <p>まだレビューがありません。</p>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </section>
    </>
  )
}
