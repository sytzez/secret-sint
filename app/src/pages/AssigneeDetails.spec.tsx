import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('/groups/:groupId/assignee', () => {
  it("shows the assignee's details", async () => {
    const mockApi = {
      assignee: vi.fn(() => ({
        user: { email: 'bob@test.com' },
        wishlist: 'Many things',
      })),
    }

    const { unmount, queryByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123/assignee']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await new Promise((r) => setTimeout(r))

    expect(mockApi.assignee).toBeCalledWith(123)

    expect(queryByText('bob@test.com')).not.toBeNull()
    expect(queryByText('Many things')).not.toBeNull()

    unmount()
  })
})
