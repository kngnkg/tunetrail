import { NextRequest, NextResponse } from "next/server"
import { toUser } from "@/service/transform"
import listUsers from "@/service/user/list-users"
import { ListUsersParams } from "@/types"

import { errBadRequest, errInternal, errNotFound } from "../response"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const cursor = searchParams.get("cursor")
  const limitStr = searchParams.get("limit")

  try {
    const params: ListUsersParams = {
      cursor: cursor,
      limit: limitStr ? parseInt(limitStr) : null,
    }

    const resp = await listUsers(params)

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
