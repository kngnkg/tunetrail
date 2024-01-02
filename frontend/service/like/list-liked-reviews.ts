import { ListLikedReviewsRequest } from "@/generated/like_pb"
import { ListReviewsRequest, ReviewList } from "@/generated/review_pb"

import { client } from "./client"

export interface ListLikedReviewsParams {
  username: string
  cursor: string | null
  limit: number | null
}

export default function listLikedReviews(
  params: ListLikedReviewsParams
): Promise<ReviewList | null> {
  return new Promise((resolve, reject) => {
    const { cursor, limit } = params

    const req = new ListLikedReviewsRequest()
    req.setUsername(params.username)

    const pagenation = new ListReviewsRequest()

    if (cursor && cursor !== "") {
      pagenation.setCursor(cursor)
    }

    if (limit && limit > 0) {
      pagenation.setLimit(limit)
    }

    if (pagenation !== null) {
      req.setPagenation(pagenation)
    }

    client.listLikedReviews(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      resolve(response)
    })
  })
}
