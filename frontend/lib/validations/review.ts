import * as z from "zod"

import { PublishedStatusType } from "@/types/type-guard"

import { albumIdSchema } from "./album"
import { uuidv4Pattern } from "./user"

export const reviewIdSchema = z
  .string()
  .refine((value) => new RegExp(uuidv4Pattern).test(value), {
    message: "レビューIDが不正です",
  })

export const reviewTitleSchema = z
  .string()
  .min(1, {
    message: "レビュータイトルは必須です",
  })
  .max(100, {
    message: "レビュータイトルは100文字以下で入力してください",
  })

// TODO: editorjsのデータ構造をzodで定義する
export const reviewContentSchema = z.any()

export const reviewPublishedStatusSchema = z.enum([
  PublishedStatusType.Published,
  PublishedStatusType.Draft,
  PublishedStatusType.Unlisted,
])

export const reviewSchema = z.object({
  albumId: albumIdSchema,
  title: reviewTitleSchema,
  content: reviewContentSchema,
  publishedStatus: reviewPublishedStatusSchema,
})

export type ReviewFormData = z.infer<typeof reviewSchema>
