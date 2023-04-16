import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Loading from './Loading'

describe('<Loading />', () => {
  it('renders something', () => {
    const { unmount, container } = render(<Loading />)
    expect(container.childElementCount).to.toBeGreaterThan(0)
    unmount()
  })
})
