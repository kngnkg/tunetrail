import { redisClient } from "@/lib/kvs"
import { SearchParams } from "@/lib/validations/search"

import { setSpotifyClientAccessToken, spotifyClient } from "../spotify-client"

export const searchAlbums = async (
  params: SearchParams
): Promise<SpotifyApi.SearchResponse | null> => {
  console.log("searchAlbums")

  try {
    await setSpotifyClientAccessToken(redisClient, spotifyClient)

    const resp = await spotifyClient.searchAlbums(params.q, {
      limit: params.limit,
      offset: params.offset,
    })

    const data = resp.body

    if (!data) {
      throw new Error("Failed to fetch album")
    }
    return data
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch album")
  }
}
