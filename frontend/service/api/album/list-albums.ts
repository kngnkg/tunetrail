import { env } from "@/env.mjs"

// import { client } from "../spotify-client"

export default async function listAlbums(
  albumIds: string[]
): Promise<SpotifyApi.SingleAlbumResponse[] | null> {
  try {
    // const resp = await client.getAlbum(albumId)
    // const data = resp.body

    const resp = await fetch(`${env.MOCK_API_ROOT}/albumlist`, {})
    const data = await resp.json()

    if (!data) {
      throw new Error("Failed to fetch album")
    }

    return data.albums
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch album")
  }
}
