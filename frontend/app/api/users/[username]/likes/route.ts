import { NextRequest, NextResponse } from "next/server"
import createLike from "@/service/like/create-like"
import * as z from "zod"

import { getCurrentUser, getServerSession } from "@/lib/session"
import { reviewIdSchema } from "@/lib/validations/review"
import {
  UserRouteContext,
  userRouteContextSchema,
} from "@/lib/validations/user"
import { errInternal, errUnauthorized } from "@/app/api/response"

const requestBodySchema = z.object({
  reviewId: reviewIdSchema,
})

export async function POST(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(null, { status: 401 })
    }

    if (user.username !== params.username) {
      return NextResponse.json(null, { status: 403 })
    }

    const json = await request.json()
    const reviewId = requestBodySchema.parse(json).reviewId

    const resp = await createLike(session.idToken, reviewId)
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      reviewId: resp.getReviewid(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
