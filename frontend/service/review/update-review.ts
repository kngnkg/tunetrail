import { Review, UpdateReviewRequest } from "@/generated/review/review_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

interface UpdateReviewInput {
  reviewId: string
  albumId: string
  title: string
  content: string
  publishedStatus: string
}

export default function updateReview(
  idToken: string,
  input: UpdateReviewInput
): Promise<Review | null> {
  return new Promise((resolve, reject) => {
    const req = new UpdateReviewRequest()

    req.setReviewid(input.reviewId)
    req.setAlbumid(input.albumId)
    req.setTitle(input.title)
    req.setContent(input.content)
    req.setPublishedstatus(input.publishedStatus)

    const metadata = getMetadata(idToken)
    client.updateReview(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
