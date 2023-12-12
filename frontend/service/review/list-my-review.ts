import { ListReviewsRequest, Review, ReviewList } from "@/generated/review_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export interface ListMyReviewsParams {
  cursor: string | null
  limit: number | null
}

export default function listMyReviews(
  idToken: string,
  params: ListMyReviewsParams
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

    const metadata = getMetadata(idToken)
    client.listMyReviews(req, metadata, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      resolve(response)
    })
  })
}
