import { Review } from "@/types"

import { transformReview } from "@/lib/transform"

export async function getReview(
  resource: RequestInfo,
  init?: RequestInit
): Promise<Review | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const review = transformReview(data)

    return review
  } catch (error) {
    console.error(error)
    return null
  }
}
