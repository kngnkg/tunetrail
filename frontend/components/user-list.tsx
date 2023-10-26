import Link from "next/link"
import { User } from "@/types"

import { FollowButton } from "@/components/follow-button"
import { UserAvatar } from "@/components/user-avatar"

interface UserListProps {
  users: Pick<User, "userId" | "displayId" | "name">[]
  isLoading?: boolean
  isError?: boolean
}

export const UserList: React.FC<UserListProps> = ({
  users,
  isLoading = false,
  isError = false,
}) => {
  // TODO: suspense
  return (
    <>
      {users.length !== 0 && !isLoading && !isError && (
        <ul className="flex flex-col gap-4">
          {users.map((user, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex gap-2 items-center text-sm sm:text-md text-zinc-400 dark:text-zinc-400">
                <Link href={`/${user.displayId}`}>
                  <UserAvatar user={user} />
                </Link>
                <div className="flex flex-col">
                  <Link href={`/${user.displayId}`}>{user.name}</Link>
                </div>
              </div>
              {/* TODO: フォローしているか確認するコードを書く */}
              <FollowButton user={user} following={false} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
