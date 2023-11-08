import * as z from "zod"

export const albumIdSchema = z.string().regex(/^[a-zA-Z0-9]{22}$/)
