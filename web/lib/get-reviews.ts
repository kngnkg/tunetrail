import { Review } from "@/types"

export function transformReview(apiReview: any): Review {
  return {
    reviewId: apiReview.review_id,
    title: apiReview.title,
    body: apiReview.body ?? "", // デフォルト値
    likesCount: apiReview.likes_count,
    liked: apiReview.liked,
    createdAt: new Date(apiReview.created_at),
    updatedAt: new Date(apiReview.updated_at),
    author: {
      userId: apiReview.author.user_id,
      displayId: apiReview.author.display_id,
      name: apiReview.author.name,
      avatarUrl: apiReview.author.avatar_url,
      bio: apiReview.bio ?? "", // デフォルト値
      followersCount: apiReview.author.followers_count,
      followingCount: apiReview.author.following_count,
      followed: apiReview.author.followed,
      following: apiReview.author.following,
      createdAt: apiReview.author.created_at
        ? new Date(apiReview.author.created_at)
        : new Date(),
      updatedAt: apiReview.author.updated_at
        ? new Date(apiReview.author.updated_at)
        : new Date(),
    },
    album: {
      albumId: apiReview.album.album_id,
      spotifyUri: apiReview.album.spotify_uri,
      spotifyUrl: apiReview.album.spotify_url,
      name: apiReview.album.name,
      diskNumber: apiReview.album.disk_number,
      artists: apiReview.album.artists.map((artist: any) => ({
        artistId: artist.artist_id,
        spotifyUri: artist.spotify_uri,
        name: artist.name,
        imageUrl: artist.image_url,
        genres: artist.genres,
      })),
      tracks: [], // デフォルト値
      coverUrl: apiReview.album.cover_url,
      releaseDate: new Date(apiReview.album.release_date),
      genres: apiReview.album.genres,
    },
  }
}

export async function getReviews(
  resource: RequestInfo,
  init?: RequestInit
): Promise<Review[] | null> {
  try {
    const res = await fetch(resource, init)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data = await res.json()

    const reviews: Review[] = data.reviews.map((review: any) =>
      transformReview(review)
    )

    return reviews
  } catch (error) {
    console.error(error)
    return null
  }
}
