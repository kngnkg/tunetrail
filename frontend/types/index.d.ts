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

export type Author = Pick<User, "userId" | "displayId" | "name" | "avatarUrl">

export type Review = {
  reviewId: string
  published: boolean
  author: Author
  album: Album
  title: string
  content: string
  likesCount: number
  createdAt: Date
  updatedAt: Date
}

export type ReviewPreview = Pick<
  Review,
  "reviewId" | "published" | "author" | "title" | "createdAt"
> & { album: AlbumInfo }

export type Album = {
  albumId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  name: string
  diskNumber: number
  artists: ArtistInfo[]
  tracks: Track[]
  coverUrl: string
  releaseDate: Date
}

export type AlbumInfo = Pick<Album, "albumId" | "name" | "artists" | "coverUrl">

export type Artist = {
  artistId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  name: string
  imageUrl: string
}

export type ArtistInfo = Pick<Artist, "artistId" | "name">

export type Track = {
  trackId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  title: string
  durationMs: number
  trackNumber: number
  previewUrl: string
}
