"use client"

import { Suspense } from "react"
import { ReviewPreview } from "@/types"

import { useReviews } from "@/hooks/reviews/use-reviews"

import { Button } from "../ui/button"
import { ReviewCard } from "./review-card"
import { ReviewCardSkeleton } from "./review-card-skeleton"

interface ReviewListProps {
  endpoint: string
}

export const ReviewList: React.FC<ReviewListProps> = ({ endpoint }) => {
  const { data, error, isLoading, isValidating, loadMore, mutateReview } =
    useReviews({ endpoint })

  if (error) {
    console.error(error)
    return <p>Something went wrong.</p>
  }

  if (!data) {
    return (
      <>
        {isLoading ? (
          <div>
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </div>
        ) : (
          <p>Something went wrong.</p>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        {data.map((reviewWithPagination, idx) => {
          return (
            <div key={idx}>
              {reviewWithPagination.reviews.map((review: ReviewPreview) => {
                return (
                  <div key={review.reviewId} className="mt-2 mb-2">
                    <Suspense fallback={<ReviewCardSkeleton />}>
                      <ReviewCard review={review} />
                    </Suspense>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div>
        <Button variant="ghost" size="lg" onClick={() => loadMore()}>
          もっと見る
        </Button>
      </div>
    </div>
  )
}
