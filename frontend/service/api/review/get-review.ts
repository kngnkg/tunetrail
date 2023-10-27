import { GetReviewByIdRequest, Review } from "@/generated/review/review_pb"

import { client } from "./client"

export default function getReview(reviewId: string): Promise<Review | null> {
  return new Promise((resolve, reject) => {
    const req = new GetReviewByIdRequest()
    req.setReviewid(reviewId)

    client.getReviewById(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
