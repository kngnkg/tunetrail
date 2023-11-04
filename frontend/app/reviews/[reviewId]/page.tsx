import Link from "next/link"
import { notFound } from "next/navigation"
import getAlbum from "@/service/album/get-album"
import getReviewById from "@/service/review/get-review"
import { toReview } from "@/service/transform"
import { Review } from "@/types"

import { FollowButton } from "@/components/follow-button"
import { ReviewContent } from "@/components/reviews/review-content"
import { TimeStamp } from "@/components/timestamp"
import { UserAvatar } from "@/components/user-avatar"

interface ReviewPageProps {
  params: { reviewId: string }
}

const getReview = async (reviewId: string): Promise<Review | null> => {
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

export default async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReview(params.reviewId)

  if (!review) {
    notFound()
  }

  const pathToUser = `/${review.author.username}`

  return (
    <div className="flex justify-center">
      <div className="sm:w-7/12 flex flex-col gap-8 mb-16">
        <ReviewContent review={review} />
        {/* 投稿ユーザーの情報 */}
        <section className="flex gap-2 text-sm sm:text-md text-zinc-400 dark:text-zinc-400">
          <Link href={pathToUser}>
            <UserAvatar user={review.author} />
          </Link>
          <div className="flex flex-col">
            <Link href={pathToUser}>{review.author.displayName}</Link>
            <div className="flex gap-2 items-center">
              <TimeStamp date={review.createdAt} />
            </div>
          </div>
          <div className="ml-4">
            <FollowButton user={review.author} following={false} />
          </div>
        </section>
        <section>コメント欄(sheet)</section>
      </div>
      <div className="fixed flex flex-col bottom-0 w-full sm:w-3/12 sm:sticky sm:top-0 sm:h-screen sm:pl-8 pr-0 pt-16">
        <div className="h-16 sm:h-20 flex items-center justify-center bg-background border-t sm:border sm:rounded-md border-zinc-700 dark:border-zinc-700">
          いいね、コメントボタン
        </div>
      </div>
    </div>
  )
}
