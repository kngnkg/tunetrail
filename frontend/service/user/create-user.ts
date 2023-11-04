import { User } from "@/generated/user/user_pb"
import * as grpc from "@grpc/grpc-js"
import { Empty } from "google-protobuf/google/protobuf/empty_pb"

import { client } from "./client"

export default function createUser(idToken: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const metadata = new grpc.Metadata()
    metadata.add("Authorization", `Bearer ${idToken}`)

    const req = new Empty()

    client.createUser(req, metadata, (err, response) => {
      if (err) {
        if (err.code === grpc.status.NOT_FOUND) {
          return resolve(null)
        }

        return reject(err)
      }
      if (!response) return resolve(null)
      resolve(response)
    })
  })
}
