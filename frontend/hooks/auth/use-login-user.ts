import { useRouter } from "next/navigation"
import { LoginUser } from "@/types"
import { useSession } from "next-auth/react"
import useSWR from "swr"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"

interface UseLoginUser {
  user: LoginUser | undefined
  // isLoading: boolean
  // isError: booleans
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<LoginUser> => {
  const res = await clientFetcher(resource, init)
  const user: LoginUser = {
    username: res.username,
    immutableId: res.immutableId,
    displayName: res.displayName,
    avatarUrl: res.avatarUrl,
    bio: res.bio,
    // followersCount: res.followersCount,
    // followingCount: res.followingCount,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  }

  return user
}

export const useLoginUser = (): UseLoginUser => {
  const { data: session, status } = useSession()
  const router = useRouter()
  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useSWR<LoginUser>(
  //   status === "authenticated" ? `${env.NEXT_PUBLIC_API_ROOT}/users/me` : null,
  //   fetcher
  // )

  // if (status === "loading") {
  //   return {
  //     user: undefined,
  //     isLoading: true,
  //     // isError: false,
  //   }
  // }

  if (status === "unauthenticated" || !session) {
    return {
      user: undefined,
      // isLoading: false,
      // isError: false,
    }
  }

  if (session.isNewUser) {
    router.push("/signup")
  }

  return {
    user: session.user,
    // isLoading: false,
    // isError: error,
  }
}
