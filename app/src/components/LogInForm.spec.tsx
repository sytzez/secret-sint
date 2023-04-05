import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import LogInForm from './LogInForm'

describe('<LogInForm />', () => {
  it('can submit an LogInRequest', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, findByLabelText } = render(
      <LogInForm onSubmit={submitMock} isLoading={false} />,
    )

    const emailElement = await findByLabelText('Email')
    fireEvent.change(emailElement, { target: { value: 'me@test.com' } })

    const passwordElement = await findByLabelText('Password')
    fireEvent.change(passwordElement, { target: { value: 'topsecret' } })

    const submitElement = await findByText('Log in')
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({
      email: 'me@test.com',
      password: 'topsecret',
    })
    unmount()
  })

  it('does not submit when the form is not filled in', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText } = render(
      <LogInForm onSubmit={submitMock} isLoading={false} />,
    )

    const submitElement = await findByText('Log in')
    fireEvent.click(submitElement)

    expect(submitMock).not.toBeCalled()
    unmount()
  })
})
