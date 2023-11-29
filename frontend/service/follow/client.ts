import { FollowServiceClient } from "@/generated/follow/follow_grpc_pb"
import * as grpc from "@grpc/grpc-js"

import { env } from "@/env.mjs"

export const client = new FollowServiceClient(
  env.GRPC_API_ROOT,
  grpc.credentials.createInsecure()
)
