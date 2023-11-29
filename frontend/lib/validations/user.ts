import * as z from "zod"

export const uuidv4Pattern =
  "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"

export const userNameSchema = z
  .string()
  .min(4, {
    message: "ユーザー名は4文字以上で入力してください",
  })
  .max(20, {
    message: "ユーザー名は20文字以下で入力してください",
  })

export const displayNameSchema = z
  .string()
  .min(3, {
    message: "表示名は3文字以上で入力してください",
  })
  .max(200, {
    message: "表示名は200文字以下で入力してください",
  })

export const avatarUrlSchema = z.string().url().or(z.literal(""))

export const bioSchema = z
  .string()
  .max(1000, {
    message: "自己紹介は1000文字以下で入力してください",
  })
  .or(z.literal(""))

export const profileSchema = z.object({
  displayName: displayNameSchema,
  avatarUrl: avatarUrlSchema,
  bio: bioSchema,
})

export const userUpdateSchema = z.object({
  username: userNameSchema.optional(),
  displayName: displayNameSchema.optional(),
  avatarUrl: avatarUrlSchema.optional(),
  bio: bioSchema.optional(),
})

export const userRouteContextSchema = z.object({
  params: z.object({
    username: userNameSchema,
  }),
})

export type UserRouteContext = z.infer<typeof userRouteContextSchema>
