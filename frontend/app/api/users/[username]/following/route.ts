import { NextRequest, NextResponse } from "next/server"
import listFollows from "@/service/follow/list-follows"

import { getServerSession } from "@/lib/session"
import {
  UserRouteContext,
  userRouteContextSchema,
} from "@/lib/validations/user"
import { errBadRequest, errInternal, errUnauthorized } from "@/app/api/response"

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const resp = await listFollows(session.idToken, [params.username])
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      follows: resp.map((follow) => ({
        username: follow.getUsername(),
        immutableId: follow.getImmutableid(),
        displayName: follow.getDisplayname(),
        isFollowing: follow.getIsfollowing(),
      })),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}

// POST
