import { describe, expect, it } from 'vitest'
import { groupSchema } from './group'

describe('groupSchema', () => {
  it('validates a simple group', () => {
    const group = {
      id: 123,
      title: 'a group',
      has_started: false,
    }
    expect(groupSchema.parse(group)).toEqual(group)
  })
  it('validates a complete group', () => {
    const group = {
      id: 123,
      title: ' a group',
      has_started: true,
      users: [{ email: 'alice@test.com ' }, { email: 'bob@test.com ' }],
      wishlist_count: 2,
      ordered_count: 1,
      delivered_count: 0,
    }
    expect(groupSchema.parse(group)).toEqual(group)
  })
  it('errors on an incomplete group', () => {
    const group = {}
    expect(groupSchema.safeParse(group).success).toBeFalsy()
  })
})
