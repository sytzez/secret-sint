import { describe, expect, it } from 'vitest'
import { participationRequestSchema } from './participation-request'

describe('participationRequestSchema', () => {
  it('validates a request with wishlist', () => {
    const request = {
      wishlist: 'My wishlist\n\n- Thing 1\n\n- Thing 2',
    }
    expect(participationRequestSchema.parse(request)).toEqual(request)
  })
  it('validates a request with present_status', () => {
    const request = {
      present_status: 'ordered',
    }
    expect(participationRequestSchema.parse(request)).toEqual(request)
  })
  it('errors on an invalid request', () => {
    const request = {
      present_status: 'invalid',
    }
    expect(participationRequestSchema.safeParse(request).success).toBeFalsy()
  })
})
