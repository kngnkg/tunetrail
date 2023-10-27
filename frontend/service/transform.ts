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
    reviewId: apiReview.reviewId,
    publishedStatus: apiReview.publishedStatus,
    title: apiReview.title,
    content: apiReview.content ?? "", // デフォルト値
    likesCount: apiReview.likesCount,
    createdAt: new Date(apiReview.createdAt),
    updatedAt: new Date(apiReview.updatedAt),
    author: transformUser(apiReview.author),
    album: {
      albumId: apiReview.album.albumId,
      spotifyUri: apiReview.album.spotifyUri,
      spotifyUrl: apiReview.album.spotifyUrl,
      name: apiReview.album.name,
      artists: apiReview.album.artists.map((artist: any) => ({
        artistId: artist.artistId,
        spotifyUri: artist.spotifyUri,
        name: artist.name,
        imageUrl: artist.imageUrl,
      })),
      tracks: [], // デフォルト値
      coverUrl: apiReview.album.coverUrl,
      releaseDate: new Date(apiReview.album.releaseDate),
    },
  }
}
