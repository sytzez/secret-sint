import { z } from 'zod'

export const groupRequestSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a title' }),
  deadline: z.date().nullish(),
})

export type GroupRequest = z.infer<typeof groupRequestSchema>
