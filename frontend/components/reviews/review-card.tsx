import Image from "next/image"
import Link from "next/link"
import { ReviewPreview } from "@/types"

import { Icon } from "../icon"
import { TimeStamp } from "../timestamp"
import { Card, CardContent } from "../ui/card"
import { UserAvatar } from "../user-avatar"

export interface ReviewCardProps {
  review: ReviewPreview
  className?: string
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className,
}) => {
  const pathToUser = `/${review.author.username}`
  const pathToReview = `/reviews/${review.reviewId}`

  return (
    <Card>
      <CardContent className="flex p-4 sm:p-8">
        {/* アルバム情報 */}
        <div className="flex flex-col mr-4 sm:mr-12">
          <Link href={pathToReview}>
            <Image
              src={review.album.coverUrl}
              height={300}
              width={300}
              alt={review.album.name}
              className="rounded-lg w-28 h-28 sm:w-48 sm:h-48"
            />
          </Link>
          <div className="pl-2 pt-1 text-zinc-400 dark:text-zinc-400">
            <p className="text-base">
              {review.album.name + " - " + review.album.artists[0].name}
            </p>
          </div>
        </div>
        <div className="sm:pt-2">
          {/* タイトル */}
          <div className="mb-2">
            <Link href={pathToReview} className="text-xl font-bold">
              {review.title}
            </Link>
          </div>
          {/* ユーザー情報 */}
          <div className="flex gap-2 text-sm sm:text-md text-zinc-400 dark:text-zinc-400">
            <Link href={pathToUser}>
              <UserAvatar user={review.author} />
            </Link>
            <div className="flex flex-col">
              <Link href={pathToUser}>{review.author.displayName}</Link>
              {/* いいね・投稿時間 */}
              <div className="flex gap-2 items-center">
                <div className="flex gap-0.5 items-center">
                  <Icon type={"like"} className="h-6 w-6" />
                  <span>{review.likesCount}</span>
                </div>
                <TimeStamp date={review.createdAt} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
