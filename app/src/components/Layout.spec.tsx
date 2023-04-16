import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Layout from './Layout'

describe('<Layout />', () => {
  it('wraps the children in a layout', () => {
    const onHomeMock = vi.fn()
    const onBackMock = vi.fn()

    const { unmount, queryByText, container } = render(
      <Layout title="The page title" onHome={onHomeMock} onBack={onBackMock}>
        <p>The page content</p>
      </Layout>,
    )

    expect(queryByText('Secret Sint')).not.toBeNull()
    expect(queryByText('The page title')).not.toBeNull()
    expect(queryByText('The page content')).not.toBeNull()

    fireEvent.click(queryByText('Secret Sint')!)
    expect(onHomeMock).toBeCalled()

    fireEvent.click(container.querySelector('[title=Back]')!)
    expect(onBackMock).toBeCalled()

    unmount()
  })
})
