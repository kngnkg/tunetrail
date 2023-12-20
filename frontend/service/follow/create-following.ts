import { FollowRequest, FollowResponse } from "@/generated/follow_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function createFollowing(
  idToken: string,
  username: string
): Promise<FollowResponse | null> {
  return new Promise((resolve, reject) => {
    const req = new FollowRequest()

    req.setUsername(username)

    const metadata = getMetadata(idToken)
    client.follow(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
