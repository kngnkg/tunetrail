import { Review as PBReview } from "@/generated/review/review_pb"

export type User = {
  username: string
  immutableId: string
  displayName: string
  avatarUrl?: string
  bio?: string
  followersCount: number
  followingCount: number
  createdAt: Date
  updatedAt: Date
}

export type Author = Pick<
  User,
  "username" | "immutableId" | "displayName" | "avatarUrl"
>

export type Review = {
  reviewId: string
  publishedStatus: string
  author: Author
  albumId: string
  title: string
  content: string
  likesCount: number
  createdAt: Date
  updatedAt: Date
}

export const toReview = (pbReview: PBReview): Review => {
  return {
    reviewId: pbReview.getReviewid(),
    publishedStatus: pbReview.getPublishedstatus(),
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

export type ReviewPreview = Pick<
  Review,
  | "reviewId"
  | "publishedStatus"
  | "author"
  | "title"
  | "likesCount"
  | "createdAt"
>
