import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('/login', () => {
  it('can send a login request', async () => {
    const mockApi = { logIn: vi.fn() }

    const { unmount, findByLabelText, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )

    const emailField = await findByLabelText('Email')
    fireEvent.change(emailField, { target: { value: 'bob@test.com' } })

    const passwordField = await findByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: 'topsecret' } })

    const submitButton = await findByText('Log in')
    fireEvent.click(submitButton)

    expect(mockApi.logIn).toBeCalledWith({
      email: 'bob@test.com',
      password: 'topsecret',
    })

    unmount()
  })
})
