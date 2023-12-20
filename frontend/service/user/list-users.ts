import { ListUsersRequest, UserList } from "@/generated/user_pb"
import { ListUsersParams } from "@/types"

import { client } from "./client"

export default function listUsers(
  params: ListUsersParams
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

    client.listUsers(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      resolve(response)
    })
  })
}
