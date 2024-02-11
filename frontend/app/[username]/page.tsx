import { env } from "@/env.mjs"
import { ReviewList } from "@/components/reviews/review-list"

interface UserPageProps {
  params: { username: string }
}

export default async function UserPage({ params }: UserPageProps) {
  const username = decodeURIComponent(params.username)

  return (
    <>
      <section>
        <ReviewList
          endpoint={`${env.NEXT_PUBLIC_API_ROOT}/${username}/reviews`}
        />
      </section>
    </>
  )
}
