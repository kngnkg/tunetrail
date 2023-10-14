import { env } from "@/env.mjs"
import { getReviews } from "@/lib/get-reviews"
import { ReviewList } from "@/components/review-list"

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return null
  }

  const reviews = await getReviews(
    `${env.API_ROOT}/reviews?title=${query}&genre=${query}`
  )

  if (!reviews) {
    return <p>レビューは見つかりませんでした。</p>
  }

  return (
    <>
      <section>
        <ReviewList reviews={reviews} />
      </section>
    </>
  )
}
