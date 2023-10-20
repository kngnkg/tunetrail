"use client"

import { User } from "@/types"

import { Button } from "./ui/button"

interface GenreFollowButtonProps {
  genre: string
  loginUser: User
  variant?: "default" | "link"
}

export const GenreFollowButton: React.FC<GenreFollowButtonProps> = ({
  genre,
  loginUser,
  variant = "default",
}) => {
  return (
    <>
      {loginUser.followingGenres.includes(genre) ? (
        <Button
          variant={variant}
          size="sm"
          className={variant === "link" ? "text-primary dark:text-primary" : ""}
        >
          フォロー中
        </Button>
      ) : (
        <Button
          variant={variant}
          size="sm"
          className={variant === "link" ? "text-primary dark:text-primary" : ""}
        >
          フォローする
        </Button>
      )}
    </>
  )
}
