import { NextRequest, NextResponse } from "next/server"
import listFollows from "@/service/follow/list-follows"

import { getServerSession } from "@/lib/session"
import { errBadRequest, errInternal, errUnauthorized } from "@/app/api/response"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const usernamesStr = searchParams.get("usernames")
  if (!usernamesStr) {
    return errBadRequest("invalid request")
  }

  // カンマ区切りの文字列を配列に変換
  const usernames = usernamesStr.split(",")

  try {
    const session = await getServerSession()
    if (!session || !session.idToken) {
      return errUnauthorized("unauthorized")
    }

    const resp = await listFollows(session.idToken, usernames)
    if (!resp) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      followings: resp.map((follow) => ({
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
