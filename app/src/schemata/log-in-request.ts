import { z } from 'zod'

export const logInRequestSchema = z.object({
  email: z.string().min(1, { message: 'Please provide an email address' }),
  password: z.string().min(1, { message: 'Please provide a password' }),
})

export type LogInRequest = z.infer<typeof logInRequestSchema>
