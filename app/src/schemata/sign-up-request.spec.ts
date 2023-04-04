import { describe, expect, it } from 'vitest'
import { signUpRequestSchema } from './sign-up-request'

describe('signUpRequestSchema', () => {
  it('validates a valid request', () => {
    const request = {
      email: 'alice@test.com',
      password: 'supersecret',
      password_confirmation: 'supersecret',
    }
    expect(signUpRequestSchema.parse(request)).toEqual(request)
  })
  it('errors on a too short password', () => {
    const request = {
      email: 'alice@test.com',
      password: '123',
      password_confirmation: '123',
    }
    expect(signUpRequestSchema.safeParse(request).success).toBeFalsy()
  })
  it('errors on mismatching passwords', () => {
    const request = {
      email: 'alice@test.com',
      password: 'supersecret',
      password_confirmation: 'SuperSecret',
    }
    expect(signUpRequestSchema.safeParse(request).success).toBeFalsy()
  })
})
