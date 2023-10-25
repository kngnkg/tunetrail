import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    API_ROOT: z.string().url(),
    MOCK_API_ROOT: z.string().url(),
    GRPC_API_ROOT: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_ROOT: z.string().url(),
    NEXT_PUBLIC_MOCK_API_ROOT: z.string().url(),
    NEXT_PUBLIC_SPOTIFY_CDN_HOST: z.string(),
  },
  runtimeEnv: {
    API_ROOT: process.env.API_ROOT,
    MOCK_API_ROOT: process.env.MOCK_API_ROOT,
    GRPC_API_ROOT: process.env.GRPC_API_ROOT,
    NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
    NEXT_PUBLIC_MOCK_API_ROOT: process.env.NEXT_PUBLIC_MOCK_API_ROOT,
    NEXT_PUBLIC_SPOTIFY_CDN_HOST: process.env.NEXT_PUBLIC_SPOTIFY_CDN_HOST,
  },
})
