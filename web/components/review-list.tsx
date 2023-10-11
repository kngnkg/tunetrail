import { Review } from "@/types"

import { ReviewCard } from "./review-card"

interface ReviewListProps {
  reviews: Review[]
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <>
      {reviews.map((review, idx) => {
        return (
          <div key={idx} className="mt-2 mb-2">
            <ReviewCard review={review} />
          </div>
        )
      })}
    </>
  )
}
