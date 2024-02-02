import { NextResponse } from "next/server"
import {
  deleteCognitoUser,
  deleteUser,
  getUsernameBySub,
} from "@/service/user/delete-user"
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

import { errInternal } from "../../response"

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

export async function DELETE(request: Request, context: UserRouteContext) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.idToken) {
      return NextResponse.json(null, { status: 401 })
    }

    // Cognitoのユーザー情報を取得
    const username = await getUsernameBySub(session.user.immutableId)

    // Cognitoからユーザー情報を削除
    if (!deleteCognitoUser(username)) {
      return errInternal("internal error")
    }

    // DBからユーザー情報を削除
    if (!deleteUser(session.idToken)) {
      return errInternal("internal error")
    }

    return NextResponse.json({
      ok: true,
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
