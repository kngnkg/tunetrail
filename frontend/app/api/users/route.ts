import { NextRequest, NextResponse } from "next/server"
import { UserReply } from "@/generated/user/user_pb"
import { listUsers } from "@/service/api/user/list-users"
import { User } from "@/types"

import { env } from "@/env.mjs"

const toUser = (userReply: UserReply): User => {
  return {
    userId: userReply.getUserid(),
    displayId: userReply.getDisplayid(),
    name: userReply.getName(),
    avatarUrl: userReply.getAvatarurl(),
    bio: userReply.getBio(),
    followersCount: userReply.getFollowerscount(),
    followingCount: userReply.getFollowingcount(),
    followed: false,
    following: false,
    followingGenres: [],
    createdAt: userReply.getCreatedat()
      ? new Date(userReply.getCreatedat())
      : new Date(),
    updatedAt: userReply.getUpdatedat()
      ? new Date(userReply.getUpdatedat())
      : new Date(),
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const userIdsString = searchParams.get("user_id")
  const userIds = userIdsString ? userIdsString.split(",") : []

  const displayIdsString = searchParams.get("display_id")
  const displayIds = displayIdsString ? displayIdsString.split(",") : []

  // TODO: クエリパラメータのバリデーション

  try {
    const reply = await listUsers(env.GRPC_API_ROOT, { userIds, displayIds })

    if (!reply) {
      return new NextResponse(null, { status: 404 })
    }

    // Userオブジェクトへの変換
    const userReplies = reply.getUsersList()
    const users = userReplies.map((userReply) => toUser(userReply))

    return new NextResponse(JSON.stringify({ users: users }))
  } catch (e) {
    console.error(e)
    return new NextResponse(null, { status: 500 })
  }
}
