import { notFound, redirect } from "next/navigation"
import getAlbum from "@/service/album/get-album"
import getMyReviewById from "@/service/review/get-my-review"
import { toReview } from "@/service/transform"
import { Review } from "@/types"

import { getCurrentUser } from "@/lib/session"
import { ReviewEditForm } from "@/components/reviews/review-edit-form"

interface EditorPageProps {
  params: { reviewId: string }
}

const getLoginUserReview = async (
  idToken: string,
  reviewId: string
): Promise<Review | null> => {
  try {
    const resp = await getMyReviewById(idToken, reviewId)

    if (!resp) {
      return null
    }

    const albumResp = await getAlbum(resp.getAlbumid())

    const review = toReview(resp, albumResp)

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
