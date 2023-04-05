import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import InviteForm from './InviteForm'

describe('<InviteForm />', () => {
  it('can submit an inviteRequest', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, findByLabelText } = render(
      <InviteForm onSubmit={submitMock} isLoading={false} />,
    )

    const emailElement = await findByLabelText('Email address')
    fireEvent.change(emailElement, { target: { value: 'friend@test.com' } })

    const submitElement = await findByText('Invite')
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({ email: 'friend@test.com' })
    unmount()
  })

  it('does not submit when the form is not filled in', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText } = render(
      <InviteForm onSubmit={submitMock} isLoading={false} />,
    )

    const submitElement = await findByText('Invite')
    fireEvent.click(submitElement)

    expect(submitMock).not.toBeCalled()
    unmount()
  })
})
