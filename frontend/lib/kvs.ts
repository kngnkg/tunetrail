import { Redis } from "ioredis"

import { env } from "@/env.mjs"

const SpotifyAccessTokenRedisKey = "spotify_access_token"

export const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
})

export const setAccessTokenToKVS = (
  redisClient: Redis,
  { token, expiresIn }: { token: string; expiresIn: number }
) => {
  // トークンの有効期限の60秒前に切れるようにする
  return redisClient.set(
    SpotifyAccessTokenRedisKey,
    token,
    "EX",
    expiresIn - 60
  )
}

export const getAccessTokenFromKVS = (redisClient: Redis) => {
  return redisClient.get(SpotifyAccessTokenRedisKey)
}
