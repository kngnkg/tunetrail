import { notFound } from "next/navigation"
import { toUser } from "@/service/transform"
import getUserByUsername from "@/service/user/get-user"
import { User } from "@/types"

import { env } from "@/env.mjs"
import { ReviewForm } from "@/components/reviews/review-form"

const getUser = async (username: string): Promise<User | null> => {
  try {
    const resp = await getUserByUsername(username)
    if (!resp) {
      return null
    }

    return toUser(resp)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function NewReviewEditorPage() {
  // TODO: ログインユーザーの情報を取得する
  const username = "user_namepwD65SH23M"
  const user = await getUser(username)

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
