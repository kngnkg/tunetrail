import { ReviewCardSkeleton } from "@/components/review-card-skeleton"

export default function UserLoading() {
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
