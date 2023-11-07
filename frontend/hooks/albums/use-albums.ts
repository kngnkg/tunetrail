import { AlbumInfo, AlbumWithPagination } from "@/types"
import useSWRInfinite from "swr/infinite"

import { clientFetcher } from "@/lib/fetcher"
import { transformAlbumInfo } from "@/hooks/transform"

interface UseAlbumsProps {
  endpoint: string
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

export const useAlbums = ({
  endpoint,
  limit = 20,
}: UseAlbumsProps): UseAlbums => {
  const getKey = (pageIndex: number, previousPageData: AlbumWithPagination) => {
    // 最後に到達した場合
    if (previousPageData && !previousPageData.next) {
      return null
    }

    // 最初のページでは、`previousPageData` がない
    if (pageIndex === 0) {
      return `${endpoint}`
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
