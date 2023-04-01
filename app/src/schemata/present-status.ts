import { z } from 'zod'

export const presentStatusSchema = z.union([
  z.literal('not_started'),
  z.literal('ordered'),
  z.literal('delivered'),
])

export type PresentStatus = z.infer<typeof presentStatusSchema>
