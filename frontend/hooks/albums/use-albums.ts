import { AlbumInfo, AlbumWithPagination } from "@/types"
import useSWRInfinite from "swr/infinite"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { transformAlbumInfo } from "@/hooks/transform"

interface UseAlbumsProps {
  query: string
  limit?: number
}

interface UseAlbums {
  data: AlbumWithPagination[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<AlbumWithPagination> => {
  const res = await clientFetcher(resource, init)
  const albums: AlbumInfo[] = res.albums.map((album: any) =>
    transformAlbumInfo(album)
  )

  return {
    albums: albums,
    next: res.next,
    limit: res.limit,
    offset: res.offset,
    total: res.total,
  }
}

export const useAlbums = ({ query, limit = 20 }: UseAlbumsProps): UseAlbums => {
  const getKey = (pageIndex: number, previousPageData: AlbumWithPagination) => {
    // 検索クエリがない場合
    if (query === "") {
      return null
    }

    // 最後に到達した場合
    if (previousPageData && !previousPageData.next) {
      return null
    }

    const endpoint = `${env.NEXT_PUBLIC_API_ROOT}/album-search?q=${query}`

    // // 最初のページの場合
    if (pageIndex === 0) {
      return `${endpoint}&offset=0&limit=${limit}`
    }

    const offset = previousPageData.offset + previousPageData.limit

    // API のエンドポイントにカーソルを追加する
    return `${endpoint}&offset=${offset}&limit=${limit}`
  }

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<AlbumWithPagination>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  return { data, error, isLoading, isValidating, loadMore }
}
