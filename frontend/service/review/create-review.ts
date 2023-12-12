import { CreateReviewRequest, Review } from "@/generated/review_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

interface CreateReviewInput {
  albumId: string
  title: string
  content: string
  publishedStatus: string
}

export default function createReview(
  idToken: string,
  input: CreateReviewInput
): Promise<Review | null> {
  return new Promise((resolve, reject) => {
    const req = new CreateReviewRequest()

    req.setAlbumid(input.albumId)
    req.setTitle(input.title)
    req.setContent(input.content)
    req.setPublishedstatus(input.publishedStatus)

    const metadata = getMetadata(idToken)
    client.createReview(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
