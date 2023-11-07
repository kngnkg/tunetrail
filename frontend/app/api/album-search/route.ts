import { NextRequest, NextResponse } from "next/server"
import { toAlbumInfo } from "@/service/transform"
import * as z from "zod"

import { env } from "@/env.mjs"

import { errBadRequest, errInternal, errNotFound } from "../response"

const searchAlbumsSchema = z.object({
  q: z.string().min(1).max(100),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

type SearchAlbumsParams = z.infer<typeof searchAlbumsSchema>

const searchAlbums = async (
  params: SearchAlbumsParams
): Promise<SpotifyApi.SearchResponse | null> => {
  // TODO: implement

  console.log("searchAlbums")

  const albumIds = ["2up3OPMp9Tb4dAKM2erWXQ", "2up3OPMp9Tb4dAKM2erWXQ"]
  const resp = await fetch(`${env.MOCK_API_ROOT}/simple-albumlist`, {})
  const data = await resp.json()

  if (!data) {
    throw new Error("Failed to fetch album")
  }

  return data
}

export async function GET(request: NextRequest) {
  console.log("GET")
  const searchParams = request.nextUrl.searchParams

  console.log(`searchParams: ${searchParams}`)
  //   const q = searchParams.get("q")
  //   if (!q) {
  //     return errBadRequest("q is required")
  //   }

  const q = "test"

  const offsetStr = searchParams.get("offset")
  const limitStr = searchParams.get("limit")

  try {
    const params: SearchAlbumsParams = {
      q: q,
      offset: offsetStr ? parseInt(offsetStr) : undefined,
      limit: limitStr ? parseInt(limitStr) : undefined,
    }

    const resp = await searchAlbums(params)
    if (!resp || !resp.albums) {
      return errNotFound("album not found")
    }

    const albums = resp.albums.items.map((album) => {
      return toAlbumInfo(album)
    })

    return NextResponse.json({
      albums: albums,
      limit: resp.albums.limit,
      next: resp.albums.next,
      offset: resp.albums.offset,
      total: resp.albums.total,
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
