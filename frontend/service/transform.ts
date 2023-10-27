import { Review, User } from "@/types"

export function transformUser(apiUser: any): User {
  return {
    username: apiUser.username,
    immutableId: apiUser.immutableId,
    displayName: apiUser.displayName,
    avatarUrl: apiUser.avatarUrl,
    bio: apiUser.bio ?? "", // デフォルト値
    followersCount: apiUser.followersCount,
    followingCount: apiUser.followingCount,
    createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
    updatedAt: apiUser.updatedAt ? new Date(apiUser.updatedAt) : new Date(),
  }
}

export function transformReview(apiReview: any): Review {
  return {
    reviewId: apiReview.review_id,
    publishedStatus: apiReview.publishedStatus,
    title: apiReview.title,
    content: apiReview.content ?? "", // デフォルト値
    likesCount: apiReview.likes_count,
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
      })),
      tracks: [], // デフォルト値
      coverUrl: apiReview.album.cover_url,
      releaseDate: new Date(apiReview.album.release_date),
    },
  }
}
