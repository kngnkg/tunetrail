import { GetReviewByIdRequest, Review } from "@/generated/review_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function getMyReviewById(
  idToken: string,
  reviewId: string
): Promise<Review | null> {
  return new Promise((resolve, reject) => {
    const req = new GetReviewByIdRequest()
    req.setReviewid(reviewId)

    const metadata = getMetadata(idToken)
    client.getMyReviewById(req, metadata, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
