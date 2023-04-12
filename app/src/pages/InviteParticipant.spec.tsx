import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { Api } from '../api/create-api'
import { awaitTick } from '../spec-helpers'

describe('/groups/:groupId/invite', async () => {
  it('can send an invite', async () => {
    const mockApi = { invite: vi.fn() }

    const { unmount, findByLabelText, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/123/invite']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )
    await awaitTick()

    const emailField = await findByLabelText('Email address')
    fireEvent.change(emailField, { target: { value: 'bob@test.com' } })

    const submitButton = await findByText('Invite')
    fireEvent.click(submitButton)

    expect(mockApi.invite).toBeCalledWith(123, { email: 'bob@test.com' })

    unmount()
  })
})
