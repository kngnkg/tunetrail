import { User } from "@/generated/user/user_pb"
import * as grpc from "@grpc/grpc-js"
import { Empty } from "google-protobuf/google/protobuf/empty_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function createUser(idToken: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const req = new Empty()

    const metadata = getMetadata(idToken)
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
