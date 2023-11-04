import { GetUserByUsernameRequest, User } from "@/generated/user/user_pb"

import { client } from "./client"

export default function getUserByUsername(
  username: string
): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const req = new GetUserByUsernameRequest()

    req.setUsername(username)

    client.getUserByUsername(req, (err, response) => {
      if (err) reject(err)
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
