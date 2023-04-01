import { z } from 'zod'

export const groupSchema = z.object({
  id: z.number(),
  title: z.string(),
  deadline: z.date().nullish(),
})

export type Group = z.infer<typeof groupSchema>
