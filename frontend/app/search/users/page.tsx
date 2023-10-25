import { transformUser } from "@/service/transform"
import { User } from "@/types"

import { env } from "@/env.mjs"
import { UserList } from "@/components/user-list"

async function getUsers(
  resource: RequestInfo,
  init?: RequestInit
): Promise<User[] | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const users: User[] = data.users.map((user: any) => transformUser(user))

    return users
  } catch (error) {
    console.error(error)
    return null
  }
}

interface UserSearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function UserSearchPage({
  searchParams,
}: UserSearchPageProps) {
  const query = searchParams.q || ""

  const users = await getUsers(
    `${env.MOCK_API_ROOT}/users?name=${query}&display_id=${query}`
  )

  if (!users) {
    return <p>ユーザーは見つかりませんでした。</p>
  }

  return (
    <>
      <section>
        <UserList users={users} />
      </section>
    </>
  )
}
