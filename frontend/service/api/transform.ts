import * as PBReview from "@/generated/review/review_pb"
import * as PBUser from "@/generated/user/user_pb"
import {
  Album,
  AlbumInfo,
  ArtistInfo,
  Author,
  Review,
  ReviewPreview,
  Track,
  User,
} from "@/types"

import { isPublishedStatus } from "@/types/type-guard"

export const toUser = (pbUser: PBUser.User): User => {
  return {
    username: pbUser.getUsername(),
    immutableId: pbUser.getImmutableid(),
    displayName: pbUser.getDisplayname(),
    avatarUrl: pbUser.getAvatarurl(),
    bio: pbUser.getBio(),
    followersCount: pbUser.getFollowerscount(),
    followingCount: pbUser.getFollowingcount(),
    createdAt: pbUser.getCreatedat()
      ? new Date(pbUser.getCreatedat())
      : new Date(),
    updatedAt: pbUser.getUpdatedat()
      ? new Date(pbUser.getUpdatedat())
      : new Date(),
  }
}

export const toReview = (
  pbReview: PBReview.Review,
  album: SpotifyApi.SingleAlbumResponse
): Review => {
  const publishedStatus = pbReview.getPublishedstatus()
  if (!isPublishedStatus(publishedStatus)) {
    throw new Error("invalid published status")
  }

  const author = pbReview.getUser()
  if (!author) {
    throw new Error("invalid author")
  }

  return {
    reviewId: pbReview.getReviewid(),
    publishedStatus: publishedStatus,
    author: toAuthor(author),
    album: toAlbum(album),
    title: pbReview.getTitle(),
    content: pbReview.getContent(),
    likesCount: pbReview.getLikescount(),
    createdAt: pbReview.getCreatedat()
      ? new Date(pbReview.getCreatedat())
      : new Date(),
    updatedAt: pbReview.getUpdatedat()
      ? new Date(pbReview.getUpdatedat())
      : new Date(),
  }
}

export const toReviewPreview = (
  pbReview: PBReview.Review,
  album: SpotifyApi.AlbumObjectSimplified
): ReviewPreview => {
  const publishedStatus = pbReview.getPublishedstatus()
  if (!isPublishedStatus(publishedStatus)) {
    throw new Error("invalid published status")
  }

  const author = pbReview.getUser()
  if (!author) {
    throw new Error("invalid author")
  }

  return {
    reviewId: pbReview.getReviewid(),
    publishedStatus: publishedStatus,
    author: toAuthor(author),
    album: toAlbumInfo(album),
    title: pbReview.getTitle(),
    likesCount: pbReview.getLikescount(),
    createdAt: pbReview.getCreatedat()
      ? new Date(pbReview.getCreatedat())
      : new Date(),
  }
}

export const toAlbumInfo = (
  album: SpotifyApi.AlbumObjectSimplified
): AlbumInfo => {
  return {
    albumId: album.id,
    name: album.name,
    artists: album.artists.map((artist) => toArtistInfo(artist)),
    coverUrl: album.images[0].url,
  }
}

export const toAuthor = (pbAuthor: PBReview.Author): Author => {
  return {
    username: pbAuthor.getUsername(),
    immutableId: pbAuthor.getImmutableid(),
    displayName: pbAuthor.getDisplayname(),
    avatarUrl: pbAuthor.getAvatarurl(),
  }
}

export const toAlbum = (
  spotifyAlbum: SpotifyApi.SingleAlbumResponse
): Album => {
  return {
    albumId: spotifyAlbum.id,
    spotifyUri: spotifyAlbum.uri,
    spotifyUrl: spotifyAlbum.external_urls.spotify,
    name: spotifyAlbum.name,
    artists: spotifyAlbum.artists.map((artist) => toArtistInfo(artist)),
    tracks: spotifyAlbum.tracks.items.map((track) => toTrack(track)),
    coverUrl: spotifyAlbum.images[0].url,
    releaseDate: new Date(spotifyAlbum.release_date),
  }
}

export const toArtistInfo = (
  spotifyArtist: SpotifyApi.ArtistObjectSimplified
): ArtistInfo => {
  return {
    artistId: spotifyArtist.id,
    name: spotifyArtist.name,
  }
}

export const toTrack = (
  spotifyTrack: SpotifyApi.TrackObjectSimplified
): Track => {
  return {
    trackId: spotifyTrack.id,
    spotifyUri: spotifyTrack.uri,
    spotifyUrl: spotifyTrack.external_urls.spotify,
    title: spotifyTrack.name,
    durationMs: spotifyTrack.duration_ms,
    trackNumber: spotifyTrack.track_number,
  }
}
