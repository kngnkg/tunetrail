import { NextRequest, NextResponse } from "next/server"
import { toUser } from "@/service/api/transform"
import listUsers from "@/service/api/user/list-users"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // カンマ区切りの文字列を配列に変換
  const usernamesString = searchParams.get("username")
  const usernames = usernamesString ? usernamesString.split(",") : []

  // TODO: クエリパラメータのバリデーション

  try {
    const resp = await listUsers({ usernames })

    if (!resp) {
      return NextResponse.json(null, { status: 404 })
    }

    const users = resp.map((user) => toUser(user))

    return NextResponse.json({ users: users })
  } catch (e) {
    console.error(e)
    return NextResponse.json(null, { status: 500 })
  }
}
