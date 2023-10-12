import { notFound } from "next/navigation"
import { User } from "@/types"

import { env } from "@/env.mjs"
import { transformUser } from "@/lib/transform"

interface UserPageProps {
  params: { userId: string }
}

async function getUser(
  resource: RequestInfo,
  init?: RequestInit
): Promise<User | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const review = transformUser(data)

    return review
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUser(`${env.API_ROOT}/users/${params.userId}`)

  if (!user) {
    notFound()
  }

  return (
    <>
      <section>
        <p>{user.name}さんのページ</p>
      </section>
    </>
  )
}
