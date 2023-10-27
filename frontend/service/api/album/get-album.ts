import { env } from "@/env.mjs"

// import { client } from "../spotify-client"

export default async function getAlbum(
  albumId: string
): Promise<SpotifyApi.SingleAlbumResponse> {
  try {
    // const resp = await client.getAlbum(albumId)
    // const data = resp.body

    const resp = await fetch(`${env.MOCK_API_ROOT}/albums/${albumId}`, {})
    const data = await resp.json()

    if (!data) {
      throw new Error("Failed to fetch album")
    }

    return data
  } catch (e) {
    console.error(e)
    throw new Error("Failed to fetch album")
  }
}
