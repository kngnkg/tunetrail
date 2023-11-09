import * as z from "zod"

export const querySchema = z.string().min(1).max(100)

export const offsetSchema = z.number().optional()

export const limitSchema = z.number().optional()

export const searchSchema = z.object({
  q: querySchema,
  offset: offsetSchema,
  limit: limitSchema,
})

export type SearchParams = z.infer<typeof searchSchema>
