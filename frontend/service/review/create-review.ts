import { CreateReviewRequest, Review } from "@/generated/review/review_pb"
import * as grpc from "@grpc/grpc-js"

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
    const metadata = new grpc.Metadata()
    metadata.add("Authorization", `Bearer ${idToken}`)

    const req = new CreateReviewRequest()

    req.setAlbumid(input.albumId)
    req.setTitle(input.title)
    req.setContent(input.content)
    req.setPublishedstatus(input.publishedStatus)

    client.createReview(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
