import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    API_ROOT: z.string().url(),
    MOCK_API_ROOT: z.string().url(),
    GRPC_API_ROOT: z.string().url(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    COGNITO_CLIENT_ID: z.string(),
    COGNITO_CLIENT_SECRET: z.string(),
    COGNITO_ISSUER: z.string().url(),
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
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_API_ROOT: process.env.NEXT_PUBLIC_API_ROOT,
    NEXT_PUBLIC_MOCK_API_ROOT: process.env.NEXT_PUBLIC_MOCK_API_ROOT,
    NEXT_PUBLIC_SPOTIFY_CDN_HOST: process.env.NEXT_PUBLIC_SPOTIFY_CDN_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,
    COGNITO_ISSUER: process.env.COGNITO_ISSUER,
  },
})
