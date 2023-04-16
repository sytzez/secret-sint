import { useContext, useEffect } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import useGroupId from '../hooks/use-group-id'
import useAsync from '../hooks/use-async'
import { ParticipationRequest } from '../schemata/participation-request'
import ErrorText from '../components/ErrorText'
import PresentStatusForm from '../components/PresentStatusForm'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

export default function EditPresentStatus() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const groupId = useGroupId()

  const {
    go: loadParticipation,
    result: participation,
    isLoading,
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

  return (
    <Layout
      title="Present status"
      onHome={() => navigate('/groups')}
      onBack={() => navigate(`/groups/${groupId}`)}
    >
      <ErrorText error={loadError} />
      {isLoading && <Loading />}
      {participation && (
        <>
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
        </>
      )}
    </Layout>
  )
}
