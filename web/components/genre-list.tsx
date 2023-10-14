import Link from "next/link"

interface GenreListProps {
  genres: string[]
  className?: string
}

export const GenreList: React.FC<GenreListProps> = ({ genres, className }) => {
  return (
    <div className="flex gap-2">
      {genres.map((genre, idx) => {
        return (
          <span key={idx} className="flex gap-2">
            <Link
              href={`/genres/${genre}`}
              className="text-zinc-500 dark:text-zinc-400"
            >
              {genre}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
