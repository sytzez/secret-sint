import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import PresentStatusForm from './PresentStatusForm'

describe('<PresentStatusForm />', () => {
  const participation = {
    user: { email: 'me@test.com' },
    present_status: 'not_started' as const,
  }

  it('can submit an participationRequest', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, findByLabelText } = render(
      <PresentStatusForm
        onSubmit={submitMock}
        isLoading={false}
        value={participation}
      />,
    )

    const selectElement = await findByLabelText('The status of your present')
    fireEvent.change(selectElement, { target: { value: 'ordered' } })

    const submitElement = await findByText('Update present status')
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({ present_status: 'ordered' })
    unmount()
  })
})
