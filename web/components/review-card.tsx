import Image from "next/image"
import { Review } from "@/types"

import { LikeButton } from "./like-button"
import { TimeStamp } from "./timestamp"
import { Card, CardContent } from "./ui/card"
import { UserAvatar } from "./user-avatar"

export interface ReviewCardProps {
  review: Review
  className?: string
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className,
}) => {
  return (
    <Card>
      <CardContent className="flex p-4 sm:p-8">
        <div className="flex flex-col mr-4 sm:mr-12">
          <Image
            src={review.album.coverUrl}
            height={300}
            width={300}
            alt={review.album.name}
            className="rounded-lg w-28 h-28 sm:w-48 sm:h-48"
          />
          <div className="pl-2 pt-1 text-zinc-400 dark:text-zinc-400">
            <p className="text-base">
              {review.album.name + " - " + review.album.artists[0].name}
            </p>
          </div>
        </div>
        <div className="sm:pt-2">
          <div className="mb-2">
            <p className="text-xl font-bold">{review.title}</p>
          </div>
          <div className="flex gap-1 mb-3 sm:mb-8 text-md sm:text-lg text-zinc-300 dark:text-zinc-300">
            {review.album.genres.map((genre, idx) => {
              return <p key={idx}>{genre}</p>
            })}
          </div>
          <div className="flex gap-2 text-sm sm:text-md text-zinc-400 dark:text-zinc-400">
            <UserAvatar user={review.author} />
            <div className="flex flex-col">
              <p>{review.author.name}</p>
              <div className="flex gap-2 items-center">
                <LikeButton review={review} />
                <TimeStamp date={review.createdAt} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
