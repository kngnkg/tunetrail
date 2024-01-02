import { env } from "@/env.mjs"
import { ReviewList } from "@/components/reviews/review-list"

interface LikesPageProps {
  params: { username: string }
}

export default async function LikesPage({ params }: LikesPageProps) {
  const username = decodeURIComponent(params.username)

  return (
    <>
      <section>
        <ReviewList
          endpoint={`${env.NEXT_PUBLIC_API_ROOT}/users/${username}/liked_reviews`}
        />
      </section>
    </>
  )
}
