import { NextRequest, NextResponse } from "next/server"
import listAlbums from "@/service/album/list-albums"
import listLikedReviews from "@/service/like/list-liked-reviews"
import { toReviewPreview } from "@/service/transform"

import {
  UserRouteContext,
  userRouteContextSchema,
} from "@/lib/validations/user"
import { errInternal } from "@/app/api/response"

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const searchParams = request.nextUrl.searchParams
    const cursor = searchParams.get("cursor")
    const limitStr = searchParams.get("limit")

    const resp = await listLikedReviews({
      username: params.username,
      cursor: cursor,
      limit: limitStr ? parseInt(limitStr) : null,
    })
    if (!resp) {
      return errInternal("internal error")
    }

    const reviewsList = resp.getReviewsList()

    // アルバム情報を取得する
    const albumIds = reviewsList.map((review) => review.getAlbumid())

    const albumsResp = await listAlbums(albumIds)
    if (!albumsResp) {
      return errInternal("internal error")
    }

    const reviews = reviewsList.map((review) => {
      const album = albumsResp.find((album) => album.id === review.getAlbumid())
      if (!album) {
        throw new Error("invalid album")
      }
      return toReviewPreview(review, album)
    })

    return NextResponse.json({
      reviews: reviews,
      nextCursor: resp.getNextcursor(),
      total: resp.getTotal(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
