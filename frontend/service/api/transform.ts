import { Review as PBReview } from "@/generated/review/review_pb"
import { User as PBUser } from "@/generated/user/user_pb"
import { Review, User, isPublishedStatus } from "@/types"

export const toUser = (pbUser: PBUser): User => {
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

// export const toReview = (pbReview: PBReview): Review => {
//   const publishedStatus = pbReview.getPublishedstatus()
//   if (!isPublishedStatus(publishedStatus)) {
//     throw new Error("invalid published status")
//   }

//   return {
//     reviewId: pbReview.getReviewid(),
//     publishedStatus: publishedStatus,
//     title: pbReview.getTitle(),
//     content: pbReview.getContent(),
//     likesCount: pbReview.getLikescount(),
//     createdAt: pbReview.getCreatedat()
//       ? new Date(pbReview.getCreatedat())
//       : new Date(),
//     updatedAt: pbReview.getUpdatedat()
//       ? new Date(pbReview.getUpdatedat())
//       : new Date(),
//   }
// }
