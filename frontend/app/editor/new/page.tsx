import { notFound } from "next/navigation"
import { getUser } from "@/service/user/get-user"

import { env } from "@/env.mjs"
import { ReviewForm } from "@/components/reviews/review-form"

export default async function NewReviewEditorPage() {
  // TODO: ログインユーザーの情報を取得する
  const username = "user_namepwD65SH23M"
  const user = await getUser(`${env.API_ROOT}/users/${username}`)

  if (!user) {
    return notFound()
  }

  return (
    <>
      <section>
        <ReviewForm />
      </section>
    </>
  )
}
