import { describe, expect, it } from 'vitest'
import { presentStatusSchema } from './present-status'

describe('presentStatusSchema', () => {
  it('validates valid values', () => {
    expect(presentStatusSchema.parse('not_started')).toBe('not_started')
    expect(presentStatusSchema.parse('ordered')).toBe('ordered')
    expect(presentStatusSchema.parse('delivered')).toBe('delivered')
  })

  it('errors on invalid values', () => {
    expect(presentStatusSchema.safeParse('').success).toBeFalsy()
    expect(presentStatusSchema.safeParse('invalid').success).toBeFalsy()
  })
})
