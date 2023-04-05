import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import GroupProgress from './GroupProgress'

describe('<GroupProgress />', () => {
  const baseGroup = {
    id: 1,
    title: 'a group',
    has_started: false,
    users: [
      { email: 'alice@test.com' },
      { email: 'bob@test.com' },
      { email: 'charles@test.com' },
    ],
  }

  it('says you need at least 3 participants', () => {
    const { unmount, queryByText } = render(
      <GroupProgress
        group={{
          ...baseGroup,
          users: [{ email: 'alice@test.com' }, { email: 'bob@test.com' }],
        }}
      />,
    )

    const labelElement = queryByText(
      'You need a least 3 participants to play Secret Sint.',
    )
    expect(labelElement).not.toBeNull()

    unmount()
  })

  it('says how many users have filled in their wishlist', () => {
    const { unmount, queryByText } = render(
      <GroupProgress
        group={{
          ...baseGroup,
          wishlist_count: 2,
        }}
      />,
    )

    const labelElement = queryByText(
      '2 out of 3 people have written their wishlist.',
    )
    expect(labelElement).not.toBeNull()

    unmount()
  })

  it('says how many Sints have ordered', () => {
    const { unmount, queryByText } = render(
      <GroupProgress
        group={{
          ...baseGroup,
          wishlist_count: 3,
          has_started: true,
          ordered_count: 2,
        }}
      />,
    )

    const labelElement = queryByText(
      '2 out of 3 Sints have ordered their presents.',
    )
    expect(labelElement).not.toBeNull()

    unmount()
  })

  it('says how many presents have been delivered', () => {
    const { unmount, queryByText } = render(
      <GroupProgress
        group={{
          ...baseGroup,
          wishlist_count: 3,
          has_started: true,
          ordered_count: 3,
          delivered_count: 2,
        }}
      />,
    )

    const labelElement = queryByText(
      '2 out of 3 Sints have received their presents.',
    )
    expect(labelElement).not.toBeNull()

    unmount()
  })
})
