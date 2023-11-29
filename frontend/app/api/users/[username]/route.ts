import { NextResponse } from "next/server"
import getUserByUsername from "@/service/user/get-user"
import updateUser from "@/service/user/update-user"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth-options"
import {
  UserRouteContext,
  userRouteContextSchema,
  userUpdateSchema,
} from "@/lib/validations/user"

export async function PATCH(req: Request, context: UserRouteContext) {
  try {
    const { params } = userRouteContextSchema.parse(context)

    const session = await getServerSession(authOptions)
    if (!session || !session.idToken) {
      return NextResponse.json(null, { status: 401 })
    }

    const user = await getUserByUsername(params.username)
    if (!user) {
      return NextResponse.json(null, { status: 404 })
    }

    // リクエストボディをバリデーションする
    const json = await req.json()
    const body = userUpdateSchema.parse(json)

    const updated = await updateUser(session.idToken, {
      username: body.username ?? undefined,
      displayName: body.displayName ?? undefined,
      avatarUrl: body.avatarUrl ?? undefined,
      bio: body.bio ?? undefined,
    })

    if (!updated) {
      return NextResponse.json(null, { status: 409 })
    }

    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    if (e instanceof z.ZodError) {
      return NextResponse.json(null, { status: 400 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}
