import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { ApiContext } from '../contexts/api-context'
import { Api } from '../api/create-api'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('/groups/new', () => {
  it('can create a group', async () => {
    const mockApi = { createGroup: vi.fn() }

    const { unmount, findByLabelText, findByText } = render(
      <ApiContext.Provider value={mockApi as unknown as Api}>
        <MemoryRouter initialEntries={['/groups/new']}>
          <App />
        </MemoryRouter>
      </ApiContext.Provider>,
    )

    const nameField = await findByLabelText('Name')
    fireEvent.change(nameField, { target: { value: 'The group name' } })

    const submitButton = await findByText('Create group')
    fireEvent.click(submitButton)

    expect(mockApi.createGroup).toBeCalledWith({ title: 'The group name' })

    unmount()
  })
})
