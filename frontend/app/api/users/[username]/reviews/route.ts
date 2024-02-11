import { NextRequest, NextResponse } from "next/server"
import getAlbum from "@/service/album/get-album"
import listAlbums from "@/service/album/list-albums"
import createReview from "@/service/review/create-review"
import listReviewsByUsername, {
  ListReviewsByUsernameParams,
} from "@/service/review/list-reviews-by-username"
import { toReview, toReviewPreview } from "@/service/transform"
import * as z from "zod"

import { getCurrentUser, getServerSession } from "@/lib/session"
import { reviewSchema } from "@/lib/validations/review"
import { userNameSchema } from "@/lib/validations/user"
import { errInternal, errNotFound } from "@/app/api/response"

const routeContextSchema = z.object({
  params: z.object({
    username: userNameSchema,
  }),
})

type UserReviewRouteContext = z.infer<typeof routeContextSchema>

export async function GET(
  request: NextRequest,
  context: UserReviewRouteContext
) {
  const { params } = routeContextSchema.parse(context)

  const searchParams = request.nextUrl.searchParams

  const cursor = searchParams.get("cursor")
  const limitStr = searchParams.get("limit")

  // TODO: クエリパラメータのバリデーション

  try {
    const prms: ListReviewsByUsernameParams = {
      username: params.username,
      cursor: cursor,
      limit: limitStr ? parseInt(limitStr) : null,
    }

    const resp = await listReviewsByUsername(prms)
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

export async function POST(req: Request, context: UserReviewRouteContext) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return NextResponse.json(null, { status: 401 })
    }

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(null, { status: 401 })
    }

    if (user.username !== params.username) {
      return NextResponse.json(null, { status: 403 })
    }

    // リクエストボディをバリデーションする
    const json = await req.json()
    const body = reviewSchema.parse(json)

    const updated = await createReview(session.idToken, {
      albumId: body.albumId,
      title: body.title,
      content: body.content,
      publishedStatus: body.publishedStatus,
    })

    if (!updated) {
      return NextResponse.json(null, { status: 409 })
    }

    const album = await getAlbum(body.albumId)

    const review = toReview(updated, album)
    return NextResponse.json(review, { status: 200 })
  } catch (e) {
    console.error(e)
    if (e instanceof z.ZodError) {
      return NextResponse.json(null, { status: 400 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}
