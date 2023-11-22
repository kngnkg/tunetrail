import { ReviewCardSkeleton } from "./review-card-skeleton"

interface ReviewListSkeletonProps {
  count: number
}

export const ReviewListSkeleton: React.FC<ReviewListSkeletonProps> = ({
  count,
}: ReviewListSkeletonProps) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <div key={idx}>
            <ReviewCardSkeleton />
          </div>
        ))}
    </div>
  )
}
