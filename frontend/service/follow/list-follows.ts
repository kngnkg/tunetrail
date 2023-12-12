import { FollowResponse, ListFollowsRequest } from "@/generated/follow_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function listFollows(
  idToken: string,
  usernames: string[]
): Promise<FollowResponse[] | null> {
  return new Promise((resolve, reject) => {
    const req = new ListFollowsRequest()

    req.setUsernamesList(usernames)

    const metadata = getMetadata(idToken)
    client.listFollows(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response.getFollowresponsesList())
    })
  })
}
