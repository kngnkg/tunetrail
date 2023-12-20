import { ReviewServiceClient } from "@/generated/review_grpc_pb"
import * as grpc from "@grpc/grpc-js"

import { env } from "@/env.mjs"

export const client = new ReviewServiceClient(
  env.GRPC_API_ROOT,
  grpc.credentials.createInsecure()
)
