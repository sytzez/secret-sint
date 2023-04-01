import { z } from 'zod'

export const groupSchema = z.object({
  title: z.string(),
  deadline: z.date(),
})

export type Group = z.infer<typeof groupSchema>
