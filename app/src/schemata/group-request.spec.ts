import { describe, expect, it } from 'vitest'
import { groupRequestSchema } from './group-request'

describe('groupRequestSchema', () => {
  it('validates a complete request', () => {
    const request = { title: 'a group ' }
    expect(groupRequestSchema.parse(request)).toEqual(request)
  })
  it('errors on an incomplete request', () => {
    const request = { title: '' }
    expect(groupRequestSchema.safeParse(request).success).toBeFalsy()
  })
})
