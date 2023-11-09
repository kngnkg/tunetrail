import { Redis } from "ioredis"
import SpotifyWebApi from "spotify-web-api-node"

import { env } from "@/env.mjs"
import { getAccessTokenFromKVS, setAccessTokenToKVS } from "@/lib/kvs"

export const spotifyClient = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
})

async function clientCredentialsGrant(
  redisClient: Redis,
  spotifyClient: SpotifyWebApi
): Promise<string | null> {
  try {
    // アクセストークンを取得する
    const data = await spotifyClient.clientCredentialsGrant()
    const token = data.body["access_token"]
    const expiresInSeconds = data.body["expires_in"]

    // KVSに保存する
    setAccessTokenToKVS(redisClient, { token, expiresIn: expiresInSeconds })

    return token
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch token")
  }
}

export async function setSpotifyClientAccessToken(
  redisClient: Redis,
  spotifyClient: SpotifyWebApi
): Promise<void> {
  let token: string | null = await getAccessTokenFromKVS(redisClient)
  if (!token) {
    token = await clientCredentialsGrant(redisClient, spotifyClient)
    if (!token) {
      throw new Error("Failed to fetch token")
    }
  }

  spotifyClient.setAccessToken(token)
}
