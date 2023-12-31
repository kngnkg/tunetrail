import { LikeRequest, LikeResponse } from "@/generated/like_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function deleteLike(
  idToken: string,
  reviewId: string
): Promise<LikeResponse | null> {
  return new Promise((resolve, reject) => {
    const req = new LikeRequest()

    req.setReviewid(reviewId)

    const metadata = getMetadata(idToken)
    client.unlike(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
