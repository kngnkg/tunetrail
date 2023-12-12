import { UpdateUserRequest, User } from "@/generated/user_pb"
import * as grpc from "@grpc/grpc-js"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

interface UpdateUserInput {
  username?: string
  displayName?: string
  avatarUrl?: string
  bio?: string
}

export default function updateUser(
  idToken: string,
  input: UpdateUserInput
): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const req = new UpdateUserRequest()

    if (input.username) req.setUsername(input.username)
    if (input.displayName) req.setDisplayname(input.displayName)
    if (input.avatarUrl) req.setAvatarurl(input.avatarUrl)
    if (input.bio) req.setBio(input.bio)

    const metadata = getMetadata(idToken)
    client.updateUser(req, metadata, (err, response) => {
      if (err) {
        if (err.code === grpc.status.ALREADY_EXISTS) {
          // TODO: Handle already exists
          return resolve(null)
        }

        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
