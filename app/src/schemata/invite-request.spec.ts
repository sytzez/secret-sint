import { describe, expect, it } from 'vitest'
import { inviteRequestSchema } from './invite-request'

describe('inviteRequestSchema', () => {
  it('validates a complete request', () => {
    const request = { email: 'alice@test.com' }
    expect(inviteRequestSchema.parse(request)).toEqual(request)
  })

  it('errors on an invalid request', () => {
    const request = { email: 'invalid' }
    expect(inviteRequestSchema.safeParse(request).success).toBeFalsy()
  })

  it('errors on an incomplete', () => {
    const request = { email: '' }
    expect(inviteRequestSchema.safeParse(request).success).toBeFalsy()
  })
})
