import { z } from 'zod'

export const groupRequestSchema = z.object({
  title: z.string(),
  deadline: z.date().nullish(),
})

export type GroupRequest = z.infer<typeof groupRequestSchema>
