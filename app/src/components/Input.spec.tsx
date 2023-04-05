import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Input from './Input'

describe('<Input />', () => {
  it('renders an input', () => {
    const { unmount, queryByLabelText } = render(
      <Input
        name="field"
        label="My field"
        placeholder="Something"
        disabled={false}
      />,
    )

    const inputElement = queryByLabelText('My field')
    expect(inputElement).not.toBeNull()

    unmount()
  })
})
