import { useContext, useEffect } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import useGroupId from '../hooks/use-group-id'
import useAsync from '../hooks/use-async'
import { ParticipationRequest } from '../schemata/participation-request'
import ErrorText from '../components/ErrorText'
import PresentStatusForm from '../components/PresentStatusForm'

export default function EditPresentStatus() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const groupId = useGroupId()

  const [loadParticipation, participation, , loadError] = useAsync(
    async () => await api.participation(groupId),
  )

  const [submit, , isSubmitting, submitError] = useAsync(
    async (request: ParticipationRequest) => {
      await api.updateParticipation(groupId, request)
      navigate(`/groups/${groupId}`)
    },
  )

  useEffect(loadParticipation, [groupId])

  if (loadError) return <p className="text-white">{loadError}</p>
  if (!participation) return <p className="text-white">Loading...</p>

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-2">Present status</h1>
      <PresentStatusForm
        onSubmit={submit}
        isLoading={isSubmitting}
        value={participation}
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
