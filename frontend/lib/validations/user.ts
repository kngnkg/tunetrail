import * as z from "zod"

export const userNameSchema = z.object({
  username: z.string().min(4).max(20),
})

export const profileSchema = z.object({
  displayName: z.string().min(3).max(200),
  avatarUrl: z.string().url().or(z.literal("")),
  bio: z.string().max(1000).or(z.literal("")),
})

export const userUpdateSchema = z.object({
  username: z.string().min(4).max(20).optional(),
  displayName: z.string().min(3).max(200).optional(),
  avatarUrl: z.string().url().or(z.literal("")).optional(),
  bio: z.string().max(1000).or(z.literal("")).optional(),
})
