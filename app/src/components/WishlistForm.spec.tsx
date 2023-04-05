import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import WishlistForm from './WishlistForm'

describe('<WishlistForm />', () => {
  it('can submit an participationRequest', async () => {
    const submitMock = vi.fn()
    const { unmount, findByText, container } = render(
      <WishlistForm onSubmit={submitMock} isLoading={false} value="" />,
    )

    const wishlistElement = container.querySelector('textarea')!
    fireEvent.change(wishlistElement, {
      target: { value: 'Wishlist\n\nthing 1\n\nthing 2' },
    })

    const submitElement = await findByText('Save wishlist')
    fireEvent.click(submitElement)

    expect(submitMock).toBeCalledWith({
      wishlist: 'Wishlist\n\nthing 1\n\nthing 2',
    })
    unmount()
  })
})
