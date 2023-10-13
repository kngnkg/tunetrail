import { User } from "@/types"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

import { clientFetcher } from "@/lib/fetcher"

import { transformUser } from "./transform"

interface UseUsersProps {
  endpoint: string
  limit?: number
}

type UseUsers = {
  users: User[]
  isError: boolean
  isLoading: boolean
}

type UserWithPagination = {
  data: User[]
  nextCursor: string | null
}

export const useUsers = ({ endpoint, limit = 10 }: UseUsersProps): UseUsers => {
  //   const getKey = (pageIndex: number, previousPageData: UserWithPagination) => {
  //     // 最後に到達
  //     if (previousPageData && !previousPageData.data) return null
  //     // 最初のページでは`previousPageData`が存在しない
  //     if (pageIndex === 0) return `${endpoint}?limit=${limit}`
  //     // エンドポイントにカーソルを追加
  //     return `${endpoint}?nextCursor=${previousPageData.nextCursor}&limit=${limit}`
  //   }
  //   const { data, error, isLoading, isValidating, mutate, size, setSize } =
  //     useSWRInfinite<User>(getKey, clientFetcher)
  //   return { data, error, isLoading, isValidating, mutate, size, setSize }

  const { data, error, isLoading } = useSWR(endpoint, clientFetcher)

  if (error) return { users: [], isError: true, isLoading }
  if (isLoading) return { users: [], isError: false, isLoading }

  const users = data.users.map((apiUser: any): User => transformUser(apiUser))

  return { users, isError: false, isLoading }
}
