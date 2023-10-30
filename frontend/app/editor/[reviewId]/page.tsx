import { notFound } from "next/navigation"
import { getReview } from "@/service/review/get-review"

import { env } from "@/env.mjs"
import { Editor } from "@/components/editor"

interface EditorPageProps {
  params: { reviewId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const review = await getReview(`${env.API_ROOT}/reviews/${params.reviewId}`)

  if (!review) {
    notFound()
  }

  return (
    <>
      <section>
        <Editor review={review} />
      </section>
    </>
  )
}
