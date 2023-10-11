export type UserId = string

export type User = {
  userId: UserId
  displayId: string
  name: string
  avatarUrl?: string
  bio?: string
  followersCount: number
  followingCount: number
  followed: boolean
  following: boolean
  createdAt: Date
  updatedAt: Date
}

export type LoginUser = Omit<User, "followed" | "following">

export type Review = {
  reviewId: string
  author: User
  album: Album
  title: string
  body: string
  likesCount: number
  liked: boolean
  createdAt: Date
  updatedAt: Date
}

export type Album = {
  albumId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  name: string
  diskNumber: number
  artists: Artist[]
  tracks: Track[]
  coverUrl: string
  releaseDate: Date
  genres: string[]
}

export type Artist = {
  artistId: string // Spotify ID
  spotifyUri: string
  //   spotifyUrl: string
  name: string
  imageUrl: string
  genres: string[]
}

export type Track = {
  trackId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  title: string
  durationMs: number
  trackNumber: number
  previewUrl: string
}
