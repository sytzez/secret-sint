import { ParticipationRequest, participationRequestSchema } from "../schemata/participation-request";

export interface WishlistFormProps {
  onSubmit: (data: ParticipationRequest) => void
  isLoading: boolean
  value: string
}

export default function WishlistForm({ onSubmit, isLoading, value }: WishlistFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (isLoading) return

        const form = event.target as unknown as { wishlist: HTMLTextAreaElement }
        const formData = { wishlist: form.wishlist.value }

        try {
          const wishlistRequest = participationRequestSchema.parse(formData)
          onSubmit(wishlistRequest)
        } catch (e) {
          console.error(e)
        }
      }}
      className="flex gap-2 flex-col"
    >
      <label htmlFor="wishlist" className="text-white">
        Wishlist
      </label>
      <textarea
        required
        id="wishlist"
        name="wishlist"
        placeholder="This is your wishlist! Write as much as you like."
        className="bg-white rounded-3xl p-4 disabled:bg-gray-300 shadow-lg"
        rows={5}
        defaultValue={value}
      />
      <button
        type="submit"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-300"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Save'}
      </button>
    </form>
  )
}
