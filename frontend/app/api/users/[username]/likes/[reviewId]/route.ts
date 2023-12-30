import { NextRequest, NextResponse } from "next/server"
import getLike from "@/service/like/get-like"
import * as z from "zod"

import { getServerSession } from "@/lib/session"
import { reviewIdSchema } from "@/lib/validations/review"
import { userRouteContextSchema } from "@/lib/validations/user"
import { errBadRequest, errInternal, errUnauthorized } from "@/app/api/response"

const routeContextSchema = userRouteContextSchema.extend({
  params: z.object({
    reviewId: reviewIdSchema,
  }),
})

type RouteContext = z.infer<typeof routeContextSchema>

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const resp = await getLike(session.idToken, params.reviewId)
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      reviewId: resp.getReviewid(),
      isLiked: resp.getIsliked(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
