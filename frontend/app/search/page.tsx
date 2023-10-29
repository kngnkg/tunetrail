import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return null
  }

  // const reviews = await getReviews(
  //   `${env.MOCK_API_ROOT}/reviews?title=${query}&genre=${query}`
  // )

  return (
    <>
      <section>
        {/* TODO: レビューの検索結果を取得する */}
        {query ? (
          <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
        ) : null}
      </section>
    </>
  )
}
