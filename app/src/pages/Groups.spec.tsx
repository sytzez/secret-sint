import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { awaitTick } from '../spec-helpers'

describe('/groups', () => {
  it('shows groups', async () => {
    const mockApi = {
      groups: vi.fn(() => [
        { id: 1, title: 'A group' },
        { id: 2, title: 'Another group' },
      ]),
    }

    const { unmount, queryByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await awaitTick()

    expect(mockApi.groups).toBeCalled()

    expect(queryByText('A group')).not.toBeNull()
    expect(queryByText('Another group')).not.toBeNull()

    unmount()
  })

  it('shows a message if there are no groups', async () => {
    const mockApi = {
      groups: vi.fn(() => []),
    }

    const { unmount, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )

    expect(mockApi.groups).toBeCalled()

    expect(
      await findByText(
        'Your groups will be shown here. ' +
          'Start a new group or ask someone to invite you to theirs.',
      ),
    ).not.toBeNull()

    unmount()
  })

  it('shows an error message if the server returned an error', async () => {
    const mockApi = {
      groups: vi.fn(async () => {
        throw new Error('Something went wrong!')
      }),
    }

    const { unmount, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )

    expect(mockApi.groups).toBeCalled()

    expect(await findByText('Something went wrong!')).not.toBeNull()

    unmount()
  })
})
