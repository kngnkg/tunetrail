import { Review } from "@/types"

import { Icon } from "../icon"

interface LikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  review: Pick<Review, "reviewId" | "likesCount">
  liked: boolean
  className?: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  review,
  className,
  ...props
}) => {
  // TODO: いいねしているか確認するコードを書く
  return (
    <div className="flex gap-0.5 items-center">
      {/* <Icon type={review.liked ? "filled-like" : "like"} className="h-6 w-6" /> */}
      <Icon type={"like"} className="h-6 w-6" />
      <span>{review.likesCount}</span>
    </div>
  )
}
