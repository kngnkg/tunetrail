import { redisClient } from "@/lib/kvs"

import { setSpotifyClientAccessToken, spotifyClient } from "../spotify-client"

export default async function listAlbums(
  albumIds: string[]
): Promise<SpotifyApi.SingleAlbumResponse[] | null> {
  console.log("listAlbums")
  try {
    await setSpotifyClientAccessToken(redisClient, spotifyClient)

    const resp = await spotifyClient.getAlbums(albumIds)
    const data = resp.body

    if (!data) {
      throw new Error("Failed to fetch album")
    }

    return data.albums
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch album")
  }
}
