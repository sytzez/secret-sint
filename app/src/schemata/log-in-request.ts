import { z } from 'zod'

export const logInRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type LogInRequest = z.infer<typeof logInRequestSchema>
