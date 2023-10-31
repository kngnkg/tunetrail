import { env } from "@/env.mjs"
import { ReviewList } from "@/components/reviews/review-list"

export default async function IndexPage() {
  return (
    <>
      <section>
        <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
      </section>
    </>
  )
}
