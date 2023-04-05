import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ErrorText from './ErrorText'

describe('<ErrorText />', () => {
  it('renders nothing when there is no error', async () => {
    const { unmount, container } = render(<ErrorText error="" />)
    expect(container.childElementCount).toBe(0)
    unmount()
  })
  it('renders an error if there is an error', async () => {
    const { unmount, findByText } = render(<ErrorText error="The error" />)
    expect(await findByText('The error')).not.toBeNull()
    unmount()
  })
})
