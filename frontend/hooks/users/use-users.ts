import { log } from "console"
import { User } from "@/types"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

import { clientFetcher } from "@/lib/fetcher"

import { transformUser } from "../transform"

interface UseUsersProps {
  endpoint: string
  limit?: number
}

type UserWithPagination = {
  users: User[]
  nextCursor: string | null
}

interface UseUsers {
  data: UserWithPagination[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<UserWithPagination> => {
  const res = await clientFetcher(resource, init)
  const users: User[] = res.users.map((user: any) => transformUser(user))

  return {
    users: users,
    nextCursor: res.nextCursor ? res.nextCursor : "",
  }
}

export const useUsers = ({ endpoint, limit = 10 }: UseUsersProps): UseUsers => {
  const getKey = (pageIndex: number, previousPageData: UserWithPagination) => {
    // 最後に到達した場合
    if (previousPageData && previousPageData.nextCursor === "") {
      return null
    }

    // 最初のページでは、`previousPageData` がない
    if (pageIndex === 0) {
      return `${endpoint}`
    }

    // API のエンドポイントにカーソルを追加する
    return `${endpoint}?cursor=${previousPageData.nextCursor}&limit=${limit}`
  }

  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<UserWithPagination>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return { data, error, isLoading, isValidating, loadMore }
}
