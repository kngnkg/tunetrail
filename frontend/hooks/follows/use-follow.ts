import useSWR from "swr"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"

interface UseFollow {
  data: boolean | undefined
  error: any
  isLoading: boolean
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<boolean> => {
  try {
    const res = await clientFetcher(resource, init)

    return res.followings[0].isFollowing
  } catch (e) {
    console.error(e)
    return false
  }
}

export const useFollow = (username: string): UseFollow => {
  const { data, error, isLoading } = useSWR(
    `${env.NEXT_PUBLIC_API_ROOT}/lookup-following?usernames=${username}`,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
  }
}
