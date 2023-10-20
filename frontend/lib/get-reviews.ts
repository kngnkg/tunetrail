import { Review } from "@/types"

import { transformReview } from "@/lib/transform"

export async function getReviews(
  resource: RequestInfo,
  init?: RequestInit
): Promise<Review[] | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const reviews: Review[] = data.reviews.map((review: any) =>
      transformReview(review)
    )

    return reviews
  } catch (error) {
    console.error(error)
    return null
  }
}
