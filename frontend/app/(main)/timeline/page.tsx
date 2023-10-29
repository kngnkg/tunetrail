import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

export default async function Timeline() {
  return (
    <>
      <section>
        {/* TODO: フォローユーザーのレビューを取得する */}
        <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
      </section>
    </>
  )
}
