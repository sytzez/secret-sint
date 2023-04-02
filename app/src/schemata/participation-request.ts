import { z } from 'zod'
import { presentStatusSchema } from './present-status'

export const participationRequestSchema = z.object({
  wishlist: z.string().nullish(),
  present_status: presentStatusSchema.nullish(),
  eta: z.date().nullish(),
})

export type ParticipationRequest = z.infer<typeof participationRequestSchema>
