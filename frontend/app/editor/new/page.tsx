import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { NewReviewForm } from "@/components/reviews/new-review-form"

export default async function NewReviewEditorPage() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect("/")
  }

  return (
    <>
      <section className="mt-4">
        <NewReviewForm user={user} />
      </section>
    </>
  )
}
