import { NextRequest, NextResponse } from "next/server"
import listAlbums from "@/service/api/album/list-albums"
import listReviews, {
  ListReviewsParams,
} from "@/service/api/review/list-reviews"
import { toReview, toReviewPreview } from "@/service/api/transform"

import { errBadRequest, errInternal, errNotFound } from "../response"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const cursor = searchParams.get("cursor")
  const limitStr = searchParams.get("limit")

  // TODO: クエリパラメータのバリデーション

  try {
    const params: ListReviewsParams = {
      cursor: cursor,
      limit: limitStr ? parseInt(limitStr) : null,
    }

    const resp = await listReviews(params)
    if (!resp) {
      return errNotFound("review not found")
    }

    const reviewsList = resp.getReviewsList()

    // アルバム情報を取得する
    const albumIds = reviewsList.map((review) => review.getAlbumid())

    const albumsResp = await listAlbums(albumIds)
    if (!albumsResp) {
      return errNotFound("album not found")
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
