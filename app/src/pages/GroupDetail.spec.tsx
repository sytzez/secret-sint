import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { awaitTick } from '../spec-helpers'

describe('/groups/:groupId', () => {
  const group = {
    id: 123,
    title: 'My group',
    has_started: false,
    users: [
      { email: 'alice@test.com' },
      { email: 'bob@test.com' },
      { email: 'charlie@test.com' },
    ],
    wishlist_count: 3,
  }

  it('can show a group and assign secret sints', async () => {
    const mockApi = {
      group: vi.fn(() => group),
      assignSecretSints: vi.fn(),
    }

    const { unmount, queryByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await awaitTick()

    expect(mockApi.group).toBeCalledWith(123)

    expect(queryByText('View your assignee')).toBeNull()
    expect(queryByText('Update your present status')).toBeNull()
    expect(queryByText('My group')).not.toBeNull()
    expect(queryByText('alice@test.com')).not.toBeNull()
    expect(queryByText('bob@test.com')).not.toBeNull()
    expect(queryByText('charlie@test.com')).not.toBeNull()

    const assignSintsButton = queryByText('Assign Secret Sints!')!
    fireEvent.click(assignSintsButton)

    expect(mockApi.assignSecretSints).toBeCalledWith(123)

    unmount()
  })

  it('shows buttons to view your assignee and update your present status if the group has started', async () => {
    const mockApi = {
      group: vi.fn(() => ({ ...group, has_started: true })),
    }

    const { unmount, queryByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await awaitTick()

    expect(mockApi.group).toBeCalledWith(123)

    expect(queryByText('View your assignee')).not.toBeNull()
    expect(queryByText('Update your present status')).not.toBeNull()
    expect(queryByText('Assign Secret Sints!')).toBeNull()

    unmount()
  })

  it('shows an error message if the response has an error', async () => {
    const mockApi = {
      group: vi.fn(() => {
        throw new Error('A server error')
      }),
    }

    const { unmount, queryByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await awaitTick()

    expect(mockApi.group).toBeCalledWith(123)

    expect(queryByText('A server error')).not.toBeNull()

    unmount()
  })
})
