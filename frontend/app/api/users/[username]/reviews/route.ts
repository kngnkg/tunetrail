import { NextResponse } from "next/server"
import getAlbum from "@/service/album/get-album"
import createReview from "@/service/review/create-review"
import { toReview } from "@/service/transform"
import * as z from "zod"

import { getCurrentUser, getServerSession } from "@/lib/session"
import { reviewSchema } from "@/lib/validations/review"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    username: userNameSchema,
  }),
})

type UserReviewRouteContext = z.infer<typeof routeContextSchema>

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
