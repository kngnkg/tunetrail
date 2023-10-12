import { ReviewCardSkeleton } from "@/components/review-card-skeleton"

export default function MainLoading() {
  return (
    <>
      <section>
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
      </section>
    </>
  )
}
