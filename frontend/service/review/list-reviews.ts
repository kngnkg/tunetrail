import { ListReviewsRequest, Review, ReviewList } from "@/generated/review_pb"

import { client } from "./client"

export interface ListReviewsParams {
  cursor: string | null
  limit: number | null
}

export default function listReviews(
  params: ListReviewsParams
): Promise<ReviewList | null> {
  return new Promise((resolve, reject) => {
    const { cursor, limit } = params

    const req = new ListReviewsRequest()

    if (cursor && cursor !== "") {
      req.setCursor(cursor)
    }

    if (limit && limit > 0) {
      req.setLimit(limit)
    }

    client.listReviews(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      resolve(response)
    })
  })
}
