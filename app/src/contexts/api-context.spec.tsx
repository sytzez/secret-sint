import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ApiContextProvider } from './api-context'
import Groups from '../pages/Groups'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  awaitTick,
  expectFetchCall,
  mockFetch,
  mockUnauthorizedFetch,
} from '../spec-helpers'

describe('<ApiContextProvider />', () => {
  it('provides API actions to its children', async () => {
    mockFetch({ success: true, data: [] })

    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <ApiContextProvider apiBase="base.url">
          <Routes>
            <Route path="/" element={<Groups />} />
          </Routes>
        </ApiContextProvider>
      </MemoryRouter>,
    )

    expectFetchCall('GET', 'base.url/groups')

    unmount()
  })

  it('redirects to /login on an authentication error', async () => {
    mockUnauthorizedFetch()

    const { unmount, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <ApiContextProvider apiBase="base.url">
          <Routes>
            <Route path="/" element={<Groups />} />
            <Route path="/login" element={<p>Login page</p>} />
          </Routes>
        </ApiContextProvider>
        ,
      </MemoryRouter>,
    )
    await awaitTick()

    expectFetchCall('GET', 'base.url/groups')

    expect(queryByText('Login page')).not.toBeNull()

    unmount()
  })
})
