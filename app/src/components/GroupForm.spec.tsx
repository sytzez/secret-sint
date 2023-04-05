import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import GroupForm from './GroupForm'

describe('<GroupForm />', () => {
  it('can submit a groupRequest', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, findByLabelText } = render(
      <GroupForm
        onSubmit={submitMock}
        isLoading={false}
        submitLabel="Submit group"
      />,
    )

    const nameElement = await findByLabelText('Name')
    fireEvent.change(nameElement, { target: { value: 'A new group' } })

    const submitElement = await findByText('Submit group')
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({ title: 'A new group' })
    unmount()
  })

  it('does not submit when the form is not filled in', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText } = render(
      <GroupForm
        onSubmit={submitMock}
        isLoading={false}
        submitLabel="Submit group"
      />,
    )

    const submitElement = await findByText('Submit group')
    fireEvent.click(submitElement)

    expect(submitMock).not.toBeCalled()
    unmount()
  })
})
