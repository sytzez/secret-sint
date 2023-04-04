import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ApiContext } from '../contexts/api-context'
import WishlistForm from '../components/WishlistForm'
import { ParticipationRequest } from '../schemata/participation-request'
import ErrorText from '../components/ErrorText'
import useAsync from '../hooks/use-async'
import useGroupId from '../hooks/use-group-id'

export default function EditWishlist() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const groupId = useGroupId()

  const {
    go: loadParticipation,
    result: participation,
    error: loadError,
  } = useAsync(async () => await api.participation(groupId))

  const {
    go: submit,
    isLoading: isSubmitting,
    error: submitError,
  } = useAsync(async (request: ParticipationRequest) => {
    await api.updateParticipation(groupId, request)
    navigate(`/groups/${groupId}`)
  })

  useEffect(loadParticipation, [groupId])

  if (loadError) return <p className="text-white">{loadError}</p>
  if (!participation) return <p className="text-white">Loading...</p>

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-2">Your wishlist</h1>
      <p className="text-white mb-2">
        Your wishlist will only be visible to your Secret Sint.
      </p>
      <WishlistForm
        onSubmit={submit}
        isLoading={isSubmitting}
        value={participation.wishlist || ''}
      />
      <ErrorText error={submitError} />
      <button
        className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
        onClick={() => navigate(`/groups/${groupId}`)}
      >
        Cancel
      </button>
    </div>
  )
}
