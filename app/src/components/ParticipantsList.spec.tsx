import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import ParticipantsList from './ParticipantsList'

describe('<ParticipantsList />', () => {
  it('renders participants', () => {
    const { unmount, queryByText } = render(
      <ParticipantsList
        users={[{ email: 'alice@test.com' }, { email: 'bob@test.com' }]}
        canAdd={true}
        onAdd={() => {
          /* do nothing */
        }}
      />,
    )
    expect(queryByText('alice@test.com')).not.toBeNull()
    expect(queryByText('bob@test.com')).not.toBeNull()
    unmount()
  })

  it('fires onAdd', async () => {
    const addMock = vi.fn()
    const { unmount, findByText } = render(
      <ParticipantsList users={[]} canAdd={true} onAdd={addMock} />,
    )
    const buttonElement = await findByText('Add participants')
    fireEvent.click(buttonElement)
    expect(addMock).toBeCalled()
    unmount()
  })

  it('does not show an add button if that was not enabled', () => {
    const { unmount, queryByText } = render(
      <ParticipantsList
        users={[]}
        canAdd={false}
        onAdd={() => {
          /* do nothing */
        }}
      />,
    )
    expect(queryByText('Add participants')).toBeNull()
    unmount()
  })
})
