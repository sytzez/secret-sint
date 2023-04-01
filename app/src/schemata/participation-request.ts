import { z } from 'zod'
import { presentStatusSchema } from "./present-status";

export const participationRequestSchema = z.object({
  wishlist: z.string().nullish(),
  present_status: presentStatusSchema.nullish(),
  eta: z.date().nullish(),
  assigned_user_id: z.number().nullish(),
})

export type ParticipationRequest = z.infer<typeof participationRequestSchema>
