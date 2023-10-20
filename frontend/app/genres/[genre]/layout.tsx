import { User } from "@/types"

import { GenreFollowButton } from "@/components/genre-follow-button"
import { MainNav } from "@/components/main-nav"

interface GenreLayoutProps {
  params: { genre: string }
  children: React.ReactNode
}

export default function GenreLayout({ params, children }: GenreLayoutProps) {
  const genre = decodeURIComponent(params.genre)

  const dummyUser: User = {
    userId: "1",
    displayId: "dummy_user",
    name: "Dummy User",
    avatarUrl: "",
    bio: "",
    followersCount: 0,
    followingCount: 0,
    followingGenres: ["rock", "classic", "jazz"],
    followed: false,
    following: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mt-10 sm:mt-0 sm:w-4/5">
        <MainNav />
      </header>
      <main className="container flex-1">
        <div className="sm:w-4/6 mx-auto">
          <div className="flex gap-16 items-center justify-center m-8">
            <h1 className="text-2xl font-bold">{genre}</h1>
            <GenreFollowButton genre={genre} loginUser={dummyUser} />
          </div>
        </div>
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
