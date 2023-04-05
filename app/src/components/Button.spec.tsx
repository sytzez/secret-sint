import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Button from './Button'

describe('<Button />', () => {
  it('fires onClick when clicked', async () => {
    const clickMock = vi.fn()
    const { findByText, unmount } = render(
      <Button onClick={clickMock} style="primary" label="Click me" />,
    )
    const buttonElement = await findByText('Click me')
    fireEvent.click(buttonElement)
    expect(clickMock).toBeCalled()
    unmount()
  })
  it("doesn't fire onClick when disabled", async () => {
    const clickMock = vi.fn()
    const { findByText, unmount } = render(
      <Button
        onClick={clickMock}
        style="primary"
        label="Click me"
        disabled={true}
      />,
    )
    const buttonElement = await findByText('Click me')
    fireEvent.click(buttonElement)
    expect(clickMock).not.toBeCalled()
    unmount()
  })
})
