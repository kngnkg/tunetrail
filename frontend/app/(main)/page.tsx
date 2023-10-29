import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

export default async function IndexPage() {
  return (
    <>
      <section>
        <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
      </section>
    </>
  )
}
