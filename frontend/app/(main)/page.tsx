import { env } from "@/env.mjs"
import { getReviews } from "@/lib/get-reviews"
import { ReviewList } from "@/components/review-list"

async function getHello(): Promise<any> {
  try {
    const response = await fetch("http://localhost:3000/api/hello")
    return response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function IndexPage() {
  const reviews = await getReviews(`${env.API_ROOT}/trends`)

  if (!reviews) {
    return <p>Something went wrong.</p>
  }

  const hello = await getHello()

  return (
    <>
      <section>
        <ReviewList reviews={reviews} />
        {hello && <p>{hello.message}</p>}
      </section>
    </>
  )
}