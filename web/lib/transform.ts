import { Review, User } from "@/types"

export function transformUser(apiUser: any): User {
  return {
    userId: apiUser.user_id,
    displayId: apiUser.display_id,
    name: apiUser.name,
    avatarUrl: apiUser.avatar_url,
    bio: apiUser.bio ?? "", // デフォルト値
    followersCount: apiUser.followers_count,
    followingCount: apiUser.following_count,
    followed: apiUser.followed,
    following: apiUser.following,
    followingGenres: apiUser.following_genres ?? [],
    createdAt: apiUser.created_at ? new Date(apiUser.created_at) : new Date(),
    updatedAt: apiUser.updated_at ? new Date(apiUser.updated_at) : new Date(),
  }
}

export function transformReview(apiReview: any): Review {
  return {
    reviewId: apiReview.review_id,
    title: apiReview.title,
    content: apiReview.content ?? "", // デフォルト値
    likesCount: apiReview.likes_count,
    liked: apiReview.liked,
    createdAt: new Date(apiReview.created_at),
    updatedAt: new Date(apiReview.updated_at),
    author: transformUser(apiReview.author),
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
