import { toUser } from "@/service/transform"
import getMe from "@/service/user/get-me"
import { LoginUser } from "@/types"
import * as NextAuth from "next-auth"
import { Session } from "next-auth"

import { authOptions } from "@/lib/auth-options"

export const getServerSession = async (): Promise<Session | null> => {
  return NextAuth.getServerSession(authOptions)
}

export const getCurrentUser = async (): Promise<LoginUser | null> => {
  try {
    const session = await getServerSession()
    if (!session || !session.idToken) {
      return null
    }

    const resp = await getMe(session.idToken)
    if (!resp) {
      return null
    }

    return toUser(resp)
  } catch (e) {
    console.error(e)
    return null
  }
}
