import { notFound, redirect } from "next/navigation"
import getAlbum from "@/service/album/get-album"
import getReviewById from "@/service/review/get-review"
import { toReview } from "@/service/transform"
import { Review } from "@/types"

import { getCurrentUser } from "@/lib/session"
import { ReviewEditForm } from "@/components/reviews/review-edit-form"

interface EditorPageProps {
  params: { reviewId: string }
}

// TODO: 認証済みユーザー専用のエンドポイントを作る
const getLoginUserReview = async (
  immutableId: string,
  reviewId: string
): Promise<Review | null> => {
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
  const user = await getCurrentUser()
  if (!user) {
    return redirect("/")
  }

  const review = await getLoginUserReview(user.immutableId, params.reviewId)
  if (!review) {
    notFound()
  }

  return (
    <>
      <section className="mt-4">
        <ReviewEditForm user={user} initialReview={review} />
      </section>
    </>
  )
}
