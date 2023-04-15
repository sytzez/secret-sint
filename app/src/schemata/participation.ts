import { z } from 'zod'
import { userSchema } from './user'
import { presentStatusSchema } from './present-status'

export const participationSchema = z.object({
  wishlist: z.string().nullish(),
  present_status: presentStatusSchema.nullish(),
  eta: z.date().nullish(),
  user: userSchema.nullish(),
})

export type Participation = z.infer<typeof participationSchema>
