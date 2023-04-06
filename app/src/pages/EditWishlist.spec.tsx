import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { Api } from '../api/create-api'

describe('/groups/:groupId/wishlist', async () => {
  it('can show and update the wishlist', async () => {
    const mockApi = {
      participation: vi.fn(() => ({
        wishlist: 'My wishlist',
        user: { email: 'alice@test.com' },
      })),
      updateParticipation: vi.fn(),
    }

    const { unmount, queryByText, container } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123/wishlist']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await new Promise((r) => setTimeout(r))

    expect(mockApi.participation).toBeCalledWith(123)

    expect(queryByText('My wishlist')).not.toBeNull()

    const textAreaElement = container.querySelector('textarea')!
    fireEvent.change(textAreaElement, { target: { value: 'My wishlist 2' } })

    const submitButton = queryByText('Save wishlist')!
    fireEvent.click(submitButton)
    await new Promise((r) => setTimeout(r))

    expect(mockApi.updateParticipation).toBeCalledWith(123, {
      wishlist: 'My wishlist 2',
    })

    unmount()
  })
})
