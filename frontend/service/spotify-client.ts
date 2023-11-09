import { Redis } from "ioredis"
import SpotifyWebApi from "spotify-web-api-node"

import { env } from "@/env.mjs"
import { setAccessTokenToKVS } from "@/lib/kvs"

// export const client = new SpotifyWebApi({
//   clientId: env.SPOTIFY_CLIENT_ID,
//   clientSecret: env.SPOTIFY_CLIENT_SECRET,
// })

export const clientCredentialsGrant = async (
  redisClient: Redis
): Promise<string | null> => {
  try {
    // アクセストークンを取得する
    // const data = await client.clientCredentialsGrant()
    // const token = data.body["access_token"]
    // const expiresInSeconds = data.body["expires_in"]

    const token = "test"
    const expiresInSeconds = 3600

    // KVSに保存する
    setAccessTokenToKVS(redisClient, { token, expiresIn: expiresInSeconds })

    return token
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch token")
  }
}
