import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

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
    await new Promise((r) => setTimeout(r))

    expect(mockApi.groups).toBeCalled()

    expect(queryByText('A group')).not.toBeNull()
    expect(queryByText('Another group')).not.toBeNull()

    unmount()
  })
})
