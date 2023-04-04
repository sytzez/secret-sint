import { describe, expect, it } from 'vitest'
import { userSchema } from './user'

describe('userSchema', () => {
  it('validates a user with an email', () => {
    const user = { email: 'email@address.com' }
    expect(userSchema.parse(user)).toEqual(user)
  })
  it('errors on a user without an email', () => {
    expect(userSchema.safeParse({}).success).toBeFalsy()
  })
})
