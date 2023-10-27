import { ListUsersRequest, User } from "@/generated/user/user_pb"

import { client } from "./client"

interface listUsersParams {
  usernames: string[]
}

export default function listUsers(
  params: listUsersParams
): Promise<User[] | null> {
  return new Promise((resolve, reject) => {
    const { usernames } = params

    const req = new ListUsersRequest()

    if (usernames.length > 0) {
      req.setUsernamesList(usernames)
    }

    client.listUsers(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)

      const users = response.getUsersList()
      resolve(users)
    })
  })
}
