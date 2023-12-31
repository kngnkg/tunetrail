import { LikeServiceClient } from "@/generated/like_grpc_pb"
import * as grpc from "@grpc/grpc-js"

import { env } from "@/env.mjs"

export const client = new LikeServiceClient(
  env.GRPC_API_ROOT,
  grpc.credentials.createInsecure()
)
