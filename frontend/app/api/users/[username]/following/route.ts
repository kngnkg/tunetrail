import { NextRequest, NextResponse } from "next/server"
import createFollowing from "@/service/follow/create-following"
import deleteFollowing from "@/service/follow/delete-following"
import listFollows from "@/service/follow/list-follows"

import { getServerSession } from "@/lib/session"
import {
  UserRouteContext,
  userRouteContextSchema,
} from "@/lib/validations/user"
import { errInternal, errUnauthorized } from "@/app/api/response"

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
      username: resp[0].getUsername(),
      immutableId: resp[0].getImmutableid(),
      displayName: resp[0].getDisplayname(),
      isFollowing: resp[0].getIsfollowing(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}

export async function POST(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const resp = await createFollowing(session.idToken, params.username)
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      username: resp.getUsername(),
      immutableId: resp.getImmutableid(),
      displayName: resp.getDisplayname(),
      isFollowing: resp.getIsfollowing(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}

export async function DELETE(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const resp = await deleteFollowing(session.idToken, params.username)
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      username: resp.getUsername(),
      immutableId: resp.getImmutableid(),
      displayName: resp.getDisplayname(),
      isFollowing: resp.getIsfollowing(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
