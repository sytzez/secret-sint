import {
  ParticipationRequest,
  participationRequestSchema,
} from '../schemata/participation-request'
import useForm from '../hooks/use-form'
import Form from './Form'

export interface WishlistFormProps {
  onSubmit: (data: ParticipationRequest) => void
  isLoading: boolean
  value: string
}

export default function WishlistForm({
  onSubmit,
  isLoading,
  value,
}: WishlistFormProps) {
  const [submit, error] = useForm(
    participationRequestSchema,
    ['wishlist'],
    onSubmit,
  )

  return (
    <Form
      submitLabel="Save wishlist"
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <textarea
        required
        id="wishlist"
        name="wishlist"
        placeholder="This is your wishlist! Write as much as you like."
        className="bg-white rounded-3xl p-4 disabled:bg-gray-300 shadow-lg mb-2"
        rows={5}
        defaultValue={value}
        disabled={isLoading}
        autoFocus
      />
    </Form>
  )
}
