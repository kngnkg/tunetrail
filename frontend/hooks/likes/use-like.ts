import useSWR, { KeyedMutator } from "swr"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"

interface UseLikeProps {
  username: string
  reviewId: string
}

interface UseLike {
  data: boolean | undefined
  error: any
  mutate: KeyedMutator<boolean>
  isLoading: boolean
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<boolean> => {
  try {
    const res = await clientFetcher(resource, init)

    return res.isLiked
  } catch (e) {
    console.error(e)
    return false
  }
}

export const useLike = ({ username, reviewId }: UseLikeProps): UseLike => {
  const { data, error, mutate, isLoading } = useSWR(
    `${env.NEXT_PUBLIC_API_ROOT}/users/${username}/likes/${reviewId}`,
    fetcher
  )

  if (username === undefined || reviewId === undefined) {
    return {
      data: false,
      error,
      mutate,
      isLoading,
    }
  }

  return {
    data,
    error,
    mutate,
    isLoading,
  }
}
