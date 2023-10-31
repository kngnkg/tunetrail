import { transformReview } from "@/service/transform"
import { ReviewPreview } from "@/types"
import useSWRInfinite from "swr/infinite"
import { number } from "zod"

import { clientFetcher } from "@/lib/fetcher"

interface UseReviewsProps {
  endpoint: string
  limit?: number
}

interface UseReviews {
  data: ReviewWithPagination[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  loadMore: () => void
  mutateReview: (reviewWPIdx: number, review: ReviewPreview) => void
}

type ReviewWithPagination = {
  reviews: ReviewPreview[]
  nextCursor: string | null
}

const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit
): Promise<ReviewWithPagination> => {
  const res = await clientFetcher(resource, init)
  const reviews: ReviewPreview[] = res.reviews.map((review: any) =>
    transformReview(review)
  )

  return {
    reviews: reviews,
    nextCursor: res.nextCursor ? res.nextCursor : "",
  }
}

export const useReviews = ({
  endpoint,
  limit = 20,
}: UseReviewsProps): UseReviews => {
  const getKey = (
    pageIndex: number,
    previousPageData: ReviewWithPagination
  ) => {
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
    useSWRInfinite<ReviewWithPagination>(getKey, fetcher)

  // 次のページを読み込む
  const loadMore = () => setSize(size + 1)

  // レビューの更新
  const mutateReview = (reviewWPIdx: number, review: ReviewPreview) => {
    if (!data) return

    // 対象のレビューのインデックスを取得
    const reviewIdx = data[reviewWPIdx].reviews.findIndex(
      (r) => r.reviewId === review.reviewId
    )

    // レビューを更新
    data[reviewWPIdx].reviews[reviewIdx] = review

    // mutate で更新
    mutate([...data], false)
  }

  return { data, error, isLoading, isValidating, loadMore, mutateReview }
}
