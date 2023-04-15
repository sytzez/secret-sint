import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('/', () => {
  it('shows the text "Secret Sint"', () => {
    const { unmount, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(queryByText('Secret Sint')).not.toBeNull()

    unmount()
  })
})
