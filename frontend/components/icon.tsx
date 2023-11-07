import {
  AvatarIcon,
  BellIcon,
  ChatBubbleIcon,
  FileTextIcon,
  HeartFilledIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

interface IconProps {
  type:
    | "user"
    | "notify"
    | "search"
    | "new-post"
    | "draft"
    | "like"
    | "filled-like"
    | "comment"
    | "add"
  className?: string
}

export const Icon: React.FC<IconProps> = ({ type, className, ...props }) => {
  const baseClassName = "w-6 h-6 text-zinc-500 dark:text-zinc-500"

  switch (type) {
    case "user":
      return <AvatarIcon className={cn(baseClassName, className)} {...props} />
    case "notify":
      return <BellIcon className={cn(baseClassName, className)} {...props} />
    case "search":
      return (
        <MagnifyingGlassIcon
          className={cn(baseClassName, className)}
          {...props}
        />
      )
    case "new-post":
      return <Pencil2Icon className={cn(baseClassName, className)} {...props} />
    case "draft":
      return (
        <FileTextIcon className={cn(baseClassName, className)} {...props} />
      )
    case "like":
      return <HeartIcon className={cn(baseClassName, className)} {...props} />
    case "filled-like":
      return (
        <HeartFilledIcon className={cn(baseClassName, className)} {...props} />
      )
    case "comment":
      return (
        <ChatBubbleIcon className={cn(baseClassName, className)} {...props} />
      )
    case "add":
      return (
        <PlusCircledIcon className={cn(baseClassName, className)} {...props} />
      )
    default:
      return null
  }
}
