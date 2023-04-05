import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('<ProgressBar />', () => {
  it('renders a label and a bar with the right width', () => {
    const { unmount, queryByText, container } = render(
      <ProgressBar label="The progress of something" progress={0.25} />,
    )

    expect(queryByText('The progress of something')).not.toBeNull()

    const barElement = container.querySelector<HTMLDivElement>(
      '.bg-gradient-to-r .bg-gradient-to-r',
    )!
    expect(barElement.style.width).toBe('25%')

    unmount()
  })
})
