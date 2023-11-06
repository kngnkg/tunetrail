import * as z from "zod"

import { PublishedStatusType } from "@/types/type-guard"

export const reviewTitleSchema = z.string().min(1).max(100)

export const reviewSchema = z.object({
  title: reviewTitleSchema,
  // TODO: editorjsのデータ構造をzodで定義する
  content: z.any(),
  publishedStatus: z.enum([
    PublishedStatusType.Published,
    PublishedStatusType.Draft,
    PublishedStatusType.Unlisted,
  ]),
})

export type ReviewFormData = z.infer<typeof reviewSchema>
