import { ListReviewsByUsernameRequest, ReviewList } from "@/generated/review_pb"

import { client } from "./client"

export interface ListReviewsByUsernameParams {
  username: string
  cursor: string | null
  limit: number | null
}

export default function listReviewsByUsername(
  params: ListReviewsByUsernameParams
): Promise<ReviewList | null> {
  return new Promise((resolve, reject) => {
    const { username, cursor, limit } = params

    const req = new ListReviewsByUsernameRequest()

    req.setUsername(username)

    if (cursor && cursor !== "") {
      req.setCursor(cursor)
    }

    if (limit && limit > 0) {
      req.setLimit(limit)
    }

    client.listReviewsByUsername(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      resolve(response)
    })
  })
}
