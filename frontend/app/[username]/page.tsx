import { notFound } from "next/navigation"
import { getReviews } from "@/service/review/get-reviews"
import { getUsers } from "@/service/user/get-users"

import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

interface UserPageProps {
  params: { username: string }
}

export default async function UserPage({ params }: UserPageProps) {
  const username = decodeURIComponent(params.username)
  const users = await getUsers(`${env.API_ROOT}/users?username=${username}`)

  if (!users || users.length === 0) {
    notFound()
  }

  if (users.length > 1) {
    throw new Error("ユーザーが重複しています。")
  }

  const user = users[0]

  const reviews = await getReviews(
    `${env.MOCK_API_ROOT}/users/${user.username}/reviews`
  )

  if (!reviews) {
    return <p>まだレビューがありません。</p>
  }

  return (
    <>
      <section>
        <ReviewList reviews={reviews} />
      </section>
    </>
  )
}
