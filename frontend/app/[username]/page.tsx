import { notFound } from "next/navigation"
import { getUser } from "@/service/user/get-user"

import { env } from "@/env.mjs"
import { ReviewList } from "@/components/review-list"

interface UserPageProps {
  params: { username: string }
}

export default async function UserPage({ params }: UserPageProps) {
  const username = decodeURIComponent(params.username)
  const user = await getUser(`${env.API_ROOT}/users/${username}`)

  if (!user) {
    notFound()
  }

  return (
    <>
      <section>
        {/* TODO: ユーザーのレビューを取得する */}
        <ReviewList endpoint={`${env.NEXT_PUBLIC_API_ROOT}/reviews`} />
      </section>
    </>
  )
}
