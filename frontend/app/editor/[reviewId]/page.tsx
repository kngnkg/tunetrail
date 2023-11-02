import { notFound } from "next/navigation"
import getAlbum from "@/service/album/get-album"
import getReviewById from "@/service/review/get-review"
import { toReview } from "@/service/transform"
import { Review } from "@/types"

import { ReviewForm } from "@/components/reviews/review-form"

interface EditorPageProps {
  params: { reviewId: string }
}

// TODO: 認証済みユーザー専用のエンドポイントを作る
const getLoginUserReview = async (reviewId: string): Promise<Review | null> => {
  try {
    const reviewResp = await getReviewById(reviewId)

    if (!reviewResp) {
      return null
    }

    const albumResp = await getAlbum(reviewResp.getAlbumid())

    const review = toReview(reviewResp, albumResp)

    return review
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const review = await getLoginUserReview(params.reviewId)

  if (!review) {
    notFound()
  }

  return (
    <>
      <section>
        <ReviewForm review={review} />
      </section>
    </>
  )
}
