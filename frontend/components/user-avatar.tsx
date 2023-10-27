import { User } from "@/types"

import { Icon } from "./icon"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  user: Pick<User, "username" | "immutableId" | "displayName" | "avatarUrl">
  className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className }) => {
  return (
    <Avatar className={className}>
      {user.avatarUrl ? (
        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
      ) : (
        <AvatarFallback>
          <Icon type="user" className="w-6 h-6" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
