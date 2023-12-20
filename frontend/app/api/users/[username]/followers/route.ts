import { NextRequest, NextResponse } from "next/server"
import listFollowers from "@/service/follow/list-followers"
import { toUser } from "@/service/transform"
import { ListUsersParams } from "@/types"

import {
  UserRouteContext,
  userRouteContextSchema,
} from "@/lib/validations/user"
import { errBadRequest, errInternal, errNotFound } from "@/app/api/response"

export async function GET(request: NextRequest, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const searchParams = request.nextUrl.searchParams
    const cursor = searchParams.get("cursor")
    const limitStr = searchParams.get("limit")

    const luParams: ListUsersParams = {
      cursor: cursor,
      limit: limitStr ? parseInt(limitStr) : null,
    }

    const resp = await listFollowers(params.username, luParams)
    if (!resp) {
      return errNotFound("user not found")
    }

    const userList = resp.getUsersList()

    const users = userList.map((user) => toUser(user))

    return NextResponse.json({
      users: users,
      nextCursor: resp.getNextcursor(),
      total: resp.getTotal(),
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
