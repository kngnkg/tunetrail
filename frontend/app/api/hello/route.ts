import { GreeterClient } from "@/generated/hello_world/hello_world_grpc_pb"
import { HelloRequest } from "@/generated/hello_world/hello_world_pb"
import * as grpc from "@grpc/grpc-js"

import { env } from "@/env.mjs"

export async function GET() {
  const client = new GreeterClient(
    env.GRPC_API_ROOT,
    grpc.credentials.createInsecure()
  )

  const request = new HelloRequest()
  request.setName("World!")

  const sayHello = new Promise((resolve, reject) => {
    client.sayHello(request, (err, response) => {
      if (err) reject(err)

      if (!response) return

      resolve(response.getMessage())
    })
  })

  try {
    const message = await sayHello

    console.log(message)

    return Response.json({ message })
  } catch (e) {
    console.error(e)
    return Response.json({ error: "error" })
  }
}
