import { notFound } from "next/navigation"

import { env } from "@/env.mjs"
import { getReviews } from "@/lib/get-reviews"
import { getUser } from "@/lib/get-user"
import { ReviewList } from "@/components/review-list"

interface LikesPageProps {
  params: { displayId: string }
}

export default async function LikesPage({ params }: LikesPageProps) {
  const displayId = decodeURIComponent(params.displayId)
  const user = await getUser(
    `${env.MOCK_API_ROOT}/users?display_id=${displayId}`
  )

  if (!user) {
    notFound()
  }

  const reviews = await getReviews(
    `${env.MOCK_API_ROOT}/users/${user.userId}/likes`
  )

  if (!reviews) {
    return <p>まだレビューをいいねしていません。</p>
  }

  return (
    <>
      <section>
        <ReviewList reviews={reviews} />
      </section>
    </>
  )
}
