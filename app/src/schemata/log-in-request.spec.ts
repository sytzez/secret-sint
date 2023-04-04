import { describe, expect, it } from 'vitest'
import { logInRequestSchema } from './log-in-request'

describe('logInRequestSchema', () => {
  it('validates a correct request', () => {
    const request = {
      email: 'bob@test.com',
      password: 'supersecretpassword',
    }
    expect(logInRequestSchema.parse(request)).toEqual(request)
  })
  it('errors on an incomplete request', () => {
    const request = {
      email: '',
      password: '',
    }
    expect(logInRequestSchema.safeParse(request).success).toBeFalsy()
  })
})
