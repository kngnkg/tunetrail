import { PublishedStatusType } from "./type-guard"

export type Username = string

export type ImmutableId = string

export type User = {
  username: Username
  immutableId: ImmutableId
  displayName: string
  avatarUrl?: string
  bio?: string
  followersCount: number
  followingCount: number
  createdAt: Date
  updatedAt: Date
}

export type LoginUser = Omit<
  User,
  "followed" | "following" | "followersCount" | "followingCount"
>

export type Author = Pick<
  User,
  "username" | "immutableId" | "displayName" | "avatarUrl"
>

export type PublishedStatus =
  | PublishedStatusType.Draft
  | PublishedStatusType.Published
  | PublishedStatusType.Unlisted

export type Review = {
  reviewId: string
  publishedStatus: PublishedStatus
  author: Author
  album: Album
  title: string
  content: Content
  likesCount: number
  createdAt: Date
  updatedAt: Date
}

export type Content = {
  blocks: ContentBlock[]
}

export type ContentBlock = {
  id?: string
  type: "paragraph" | "header" | "list" | "quote"
  data: any
}

export type ReviewPreview = Pick<
  Review,
  | "reviewId"
  | "publishedStatus"
  | "author"
  | "title"
  | "likesCount"
  | "createdAt"
> & { album: AlbumInfo }

export type Album = {
  albumId: string // Spotify ID
  spotifyUri: string
  spotifyUrl: string
  name: string
  artists: ArtistInfo[]
  tracks: Track[]
  coverUrl: string
  releaseDate: Date
}

export type AlbumInfo = Pick<Album, "albumId" | "name" | "artists" | "coverUrl">

export type AlbumWithPagination = {
  albums: AlbumInfo[]
  limit: number
  next: string | null
  offset: number
  total: number
}

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
}
