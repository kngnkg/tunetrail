import { getReviews } from "@/service/review/get-reviews"

import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

export default async function Timeline() {
  const reviews = await getReviews(`${env.MOCK_API_ROOT}/timeline`)

  if (!reviews) {
    return <p>Something went wrong.</p>
  }

  return (
    <>
      <section>
        <ReviewList reviews={reviews} />
      </section>
    </>
  )
}
