import { FollowResponse, ListFollowsRequest } from "@/generated/follow_pb"
import { ListUsersRequest, UserList } from "@/generated/user_pb"

import { getMetadata } from "@/lib/grpc"

import { ListUsersParams } from "../user/list-users"
import { client } from "./client"

export default function listMyFollowees(
  idToken: string,
  params: ListUsersParams // TODO:別の場所に定義
): Promise<UserList | null> {
  return new Promise((resolve, reject) => {
    const { cursor, limit } = params

    const req = new ListUsersRequest()

    if (cursor && cursor !== "") {
      req.setCursor(cursor)
    }

    if (limit && limit > 0) {
      req.setLimit(limit)
    }

    const metadata = getMetadata(idToken)
    client.listFollowings(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
