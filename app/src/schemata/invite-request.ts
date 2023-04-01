import { z } from 'zod'

export const inviteRequestSchema = z.object({
  email: z.string().email(),
})

export type InviteRequest = z.infer<typeof inviteRequestSchema>
