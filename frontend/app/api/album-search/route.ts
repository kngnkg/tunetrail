import { NextRequest, NextResponse } from "next/server"
import { searchAlbums } from "@/service/album/search-albums"
import { toAlbumInfo } from "@/service/transform"

import { SearchParams } from "@/lib/validations/search"

import { errBadRequest, errInternal, errNotFound } from "../response"

export async function GET(request: NextRequest) {
  console.log("GET /api/album-search")
  const searchParams = request.nextUrl.searchParams

  const q = searchParams.get("q")
  if (!q) {
    return errBadRequest("q is required")
  }

  const offsetStr = searchParams.get("offset")
  const limitStr = searchParams.get("limit")

  try {
    const params: SearchParams = {
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
