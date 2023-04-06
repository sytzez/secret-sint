import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Form from './Form'

describe('<Form />', () => {
  const initialize = (props: object = {}) => {
    const { submitMock, isLoading, error } = Object.assign(
      {
        submitMock: () => {
          /* do nothing */
        },
        isLoading: false,
        error: '',
      },
      props,
    )
    const { unmount, findByText, queryByText } = render(
      <Form
        submitLabel="Submit it!"
        onSubmit={submitMock}
        isLoading={isLoading}
        error={error}
      >
        <div>Child node</div>
      </Form>,
    )
    return { unmount, findByText, queryByText }
  }

  it('renders children', () => {
    const { unmount, findByText } = initialize()
    expect(findByText('Child node')).not.toBeNull()
    unmount()
  })

  it('shows the submit label', () => {
    const { unmount, findByText } = initialize()
    expect(findByText('Submit it!')).not.toBeNull()
    unmount()
  })

  it('shows an error', () => {
    const { unmount, findByText } = initialize({ error: 'Uh oh!' })
    expect(findByText('Uh oh!')).not.toBeNull()
    unmount()
  })

  it('sends onSubmit when submitted', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, queryByText } = initialize({ submitMock })
    expect(queryByText('...')).toBeNull()
    const submitElement = await findByText('Submit it!')
    fireEvent.click(submitElement)
    expect(submitMock).toBeCalled()
    unmount()
  })

  it('does not send onSubmit when loading', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, queryByText } = initialize({
      submitMock,
      isLoading: true,
    })
    expect(queryByText('Submit it!')).toBeNull()
    const submitElement = await findByText('...')
    fireEvent.click(submitElement)
    expect(submitMock).not.toBeCalled()
    unmount()
  })
})
