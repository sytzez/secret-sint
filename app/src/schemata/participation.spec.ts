import { describe, expect, it } from 'vitest'
import { participationSchema } from './participation'

describe('participationSchema', () => {
  it('validates a participation without wishlist', () => {
    const participation = {
      wishlist: null,
      present_status: 'not_started',
      user: {
        email: 'alice@test.com',
      },
    }
    expect(participationSchema.parse(participation)).toEqual(participation)
  })
  it('validates a participation with a wishlist', () => {
    const participation = {
      wishlist: 'My wishlist',
      present_status: 'delivered',
      user: {
        email: 'bob@test.com',
      },
    }
    expect(participationSchema.parse(participation)).toEqual(participation)
  })
  it('errors on an incomplete participation', () => {
    const participation = {}
    expect(participationSchema.safeParse(participation).success).toBeFalsy()
  })
})
