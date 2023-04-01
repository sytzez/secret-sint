import { z } from 'zod'

export const signUpRequestSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
})

export type SignUpRequest = z.infer<typeof signUpRequestSchema>
