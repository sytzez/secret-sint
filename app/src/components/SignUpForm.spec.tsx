import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import SignUpForm from './SignUpForm'

describe('<SignUpForm />', () => {
  const initialize = async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, findByLabelText } = render(
      <SignUpForm onSubmit={submitMock} isLoading={false} />,
    )

    const [
      emailElement,
      passwordElement,
      passwordConfirmationElement,
      submitElement,
    ] = await Promise.all([
      findByLabelText('Email'),
      findByLabelText('Password'),
      findByLabelText('Confirm password'),
      findByText('Sign up'),
    ])

    return {
      unmount,
      submitMock,
      emailElement,
      passwordElement,
      passwordConfirmationElement,
      submitElement,
    }
  }

  it('can submit an signUpRequest', async () => {
    const {
      submitMock,
      emailElement,
      passwordElement,
      passwordConfirmationElement,
      submitElement,
      unmount,
    } = await initialize()

    fireEvent.change(emailElement, { target: { value: 'me@test.com' } })
    fireEvent.change(passwordElement, { target: { value: 'topsecret' } })
    fireEvent.change(passwordConfirmationElement, {
      target: { value: 'topsecret' },
    })
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({
      email: 'me@test.com',
      password: 'topsecret',
      password_confirmation: 'topsecret',
    })
    unmount()
  })

  it('does not submit when passwords do not match', async () => {
    const {
      submitMock,
      emailElement,
      passwordElement,
      passwordConfirmationElement,
      submitElement,
      unmount,
    } = await initialize()

    fireEvent.change(emailElement, { target: { value: 'me@test.com' } })
    fireEvent.change(passwordElement, { target: { value: 'topsecret' } })
    fireEvent.change(passwordConfirmationElement, {
      target: { value: 'somethingelse' },
    })
    fireEvent.click(submitElement)

    expect(submitMock).not.toBeCalled()
    unmount()
  })
})
