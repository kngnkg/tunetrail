import { NextRequest, NextResponse } from "next/server"
import { toUser } from "@/service/api/transform"
import getUser from "@/service/api/user/get-user"

interface UserRouteProps {
  params: { username: string }
}

export async function GET(request: NextRequest, { params }: UserRouteProps) {
  const username = params.username

  try {
    const resp = await getUser(username)

    if (!resp) {
      return NextResponse.json(null, { status: 404 })
    }

    const user = toUser(resp)

    return NextResponse.json(user)
  } catch (e) {
    console.error(e)
    return NextResponse.json(null, { status: 500 })
  }
}
