import { NextResponse } from "next/server"
import * as z from "zod"

import { getCurrentUser, getServerSession } from "@/lib/session"

const routeContextSchema = z.object({
  params: z.object({
    username: z.string().min(4).max(20),
  }),
})

type UserReviewRouteContext = z.infer<typeof routeContextSchema>

export async function POST(req: Request, context: UserReviewRouteContext) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession()
    if (!session || !session.idToken) {
      return NextResponse.json(null, { status: 401 })
    }

    // const user = await getCurrentUser()
    // if (!user) {
    //   return NextResponse.json(null, { status: 401 })
    // }

    // if (user.username !== params.username) {
    //   return NextResponse.json(null, { status: 403 })
    // }

    // リクエストボディをバリデーションする
    const json = await req.json()
    const body = userUpdateSchema.parse(json)

    const updated = await createReview(session.idToken, {
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
