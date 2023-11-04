import * as Primitive from "next-auth"

import { authOptions } from "@/lib/auth-options"

interface CurrentUserInfo {
  immutableId?: string | null
}

interface Session {
  user?: CurrentUserInfo
  idToken?: string
  accessToken?: string
}

export default async function getServerSession(): Promise<Session | null> {
  const nextAuthSession = await Primitive.getServerSession(authOptions)

  if (!nextAuthSession) {
    return null
  }

  const user: CurrentUserInfo = {
    immutableId: nextAuthSession.user ? nextAuthSession.user.immutableId : null,
  }

  const session: Session = {
    user: nextAuthSession.user ? user : undefined,
    idToken: nextAuthSession.idToken,
    accessToken: nextAuthSession.accessToken,
  }

  return session
}
