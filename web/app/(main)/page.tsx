import { env } from "@/env.mjs"
import { getReviews } from "@/lib/get-reviews"
import { ReviewList } from "@/components/review-list"

export default async function IndexPage() {
  const reviews = await getReviews(`${env.API_ROOT}/trends`)

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
