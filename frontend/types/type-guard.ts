import { PublishedStatus } from "@/types"

export const isPublishedStatus = (value: string): value is PublishedStatus => {
  return value === "published" || value === "draft" || value === "unlisted"
}
