import { ListFollowingsRequest } from "@/generated/follow_pb"
import { ListUsersRequest, UserList } from "@/generated/user_pb"
import { ListUsersParams } from "@/types"

import { client } from "./client"

export default function listFollowees(
  username: string,
  params: ListUsersParams // TODO:別の場所に定義
): Promise<UserList | null> {
  return new Promise((resolve, reject) => {
    const { cursor, limit } = params

    const req = new ListFollowingsRequest()
    req.setUsername(username)

    const pagenation = new ListUsersRequest()

    if (cursor && cursor !== "") {
      pagenation.setCursor(cursor)
    }

    if (limit && limit > 0) {
      pagenation.setLimit(limit)
    }

    if (pagenation !== null) {
      req.setPagenation(pagenation)
    }

    client.listFollowees(req, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
