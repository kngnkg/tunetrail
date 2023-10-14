import { env } from "@/env.mjs"
import { GenreList } from "@/components/genre-list"

async function getGenres(
  resource: RequestInfo,
  init?: RequestInit
): Promise<string[] | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    return data.genres
  } catch (error) {
    console.error(error)
    return null
  }
}

interface GenreSearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function GenreSearchPage({
  searchParams,
}: GenreSearchPageProps) {
  const query = searchParams.q || ""

  const genres = await getGenres(`${env.API_ROOT}/genres?q=${query}`)

  if (!genres) {
    return <p>ジャンルは見つかりませんでした。</p>
  }

  return (
    <>
      <section>
        <GenreList genres={genres} />
      </section>
    </>
  )
}
