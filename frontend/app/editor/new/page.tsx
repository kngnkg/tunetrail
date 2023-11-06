import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { ReviewForm } from "@/components/reviews/review-form"

export default async function NewReviewEditorPage() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect("/")
  }

  return (
    <>
      <section>
        <ReviewForm />
      </section>
    </>
  )
}
