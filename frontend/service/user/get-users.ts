import { transformUser } from "@/service/transform"
import { User } from "@/types"

export async function getUsers(
  resource: RequestInfo,
  init?: RequestInit
): Promise<User[] | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const users = data.users.map((user: any) => transformUser(user))

    return users
  } catch (error) {
    console.error(error)
    return null
  }
}
