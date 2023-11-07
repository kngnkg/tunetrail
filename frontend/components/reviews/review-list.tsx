"use client"

import * as React from "react"
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
          <div className="flex flex-col gap-2">
            <div className="mt-4 flex flex-col gap-4">
              {Array(10)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx}>
                    <ReviewCardSkeleton />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p>Something went wrong.</p>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {data.map((reviewWithPagination, idx) => {
        return (
          <div key={idx} className="mt-4 flex flex-col gap-4">
            {reviewWithPagination.reviews.map((review: ReviewPreview) => {
              return (
                <div key={review.reviewId}>
                  <Suspense fallback={<ReviewCardSkeleton />}>
                    <ReviewCard review={review} />
                  </Suspense>
                </div>
              )
            })}
          </div>
        )
      })}
      <div className="mb-20 flex flex-col items-center">
        <Button variant="ghost" size="lg" onClick={() => loadMore()}>
          もっと見る
        </Button>
      </div>
    </div>
  )
}
