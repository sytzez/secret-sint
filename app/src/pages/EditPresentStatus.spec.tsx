import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { Api } from '../api/create-api'

describe('/groups/:groupId/present-status', async () => {
  it('can show and update the present status', async () => {
    const mockApi = {
      participation: vi.fn(() => ({
        present_status: 'not_started' as const,
        user: { email: 'alice@test.com' },
      })),
      updateParticipation: vi.fn(),
    }

    const { unmount, queryByText, findByLabelText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123/present-status']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await new Promise((r) => setTimeout(r))

    expect(mockApi.participation).toBeCalledWith(123)

    expect(queryByText('Not started')).not.toBeNull()

    const selectElement = await findByLabelText('The status of your present')
    fireEvent.change(selectElement, { target: { value: 'ordered' } })

    const submitButton = queryByText('Update present status')!
    fireEvent.click(submitButton)

    expect(mockApi.updateParticipation).toBeCalledWith(123, {
      present_status: 'ordered',
    })

    unmount()
  })
})
