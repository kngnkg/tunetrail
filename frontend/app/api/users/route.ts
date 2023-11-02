import { NextRequest, NextResponse } from "next/server"
import { toUser } from "@/service/transform"
import listUsers, { ListUsersParams } from "@/service/user/list-users"

import { errBadRequest, errInternal, errNotFound } from "../response"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // カンマ区切りの文字列を配列に変換
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
