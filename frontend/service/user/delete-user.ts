import { Empty } from "google-protobuf/google/protobuf/empty_pb"

import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

export default function deleteUser(idToken: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = new Empty()

    const metadata = getMetadata(idToken)
    client.deleteUser(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(false)
      resolve(true)
    })
  })
}
