import { PublishedStatus } from "@/types"

export const isPublishedStatus = (value: string): value is PublishedStatus => {
  return (
    value === PublishedStatusType.Published ||
    value === PublishedStatusType.Draft ||
    value === PublishedStatusType.Unlisted
  )
}

export enum PublishedStatusType {
  Published = "published",
  Draft = "draft",
  Unlisted = "unlisted",
}
