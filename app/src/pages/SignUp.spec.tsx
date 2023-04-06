import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('/signup', () => {
  it('can send a sign up request', async () => {
    const mockApi = { signUp: vi.fn() }

    const { unmount, findByLabelText, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/signup']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )

    const emailField = await findByLabelText('Email')
    fireEvent.change(emailField, { target: { value: 'bob@test.com' } })

    const passwordField = await findByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: 'topsecret' } })

    const passwordConfirmationField = await findByLabelText('Confirm password')
    fireEvent.change(passwordConfirmationField, {
      target: { value: 'topsecret' },
    })

    const submitButton = await findByText('Sign up')
    fireEvent.click(submitButton)

    expect(mockApi.signUp).toBeCalledWith({
      email: 'bob@test.com',
      password: 'topsecret',
      password_confirmation: 'topsecret',
    })

    unmount()
  })
})
