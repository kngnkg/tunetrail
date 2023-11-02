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
        {/* TODO: いいねしたレビューを取得する */}
        {/* `${env.NEXT_PUBLIC_API_ROOT}/${username}/likes` */}
        <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
      </section>
    </>
  )
}
