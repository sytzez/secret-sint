import { z } from 'zod'
import { userSchema } from './user'

export const groupSchema = z.object({
  id: z.number(),
  title: z.string(),
  deadline: z.date().nullish(),
  has_started: z.boolean(),
  users: userSchema.array(),
})

export type Group = z.infer<typeof groupSchema>
