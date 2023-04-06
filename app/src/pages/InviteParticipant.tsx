import InviteForm from '../components/InviteForm'
import { useContext } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate, useParams } from 'react-router-dom'
import { InviteRequest } from '../schemata/invite-request'
import ErrorText from '../components/ErrorText'
import useAsync from '../hooks/use-async'

export default function InviteParticipant() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const { groupId } = useParams()

  const {
    go: submit,
    isLoading,
    error,
  } = useAsync(async (request: InviteRequest) => {
    await api.invite(Number(groupId), request)
    navigate(`/groups/${groupId}`)
  })

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-2">
        Invite a participant
      </h1>
      <p className="mb-4 text-white">
        You can invite participants once they have registered with the platform.
      </p>
      <InviteForm onSubmit={submit} isLoading={isLoading} />
      <ErrorText error={error} />
      <button
        className="rounded-full border border-red-300 text-center text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
        onClick={() => navigate(`/groups/${groupId}`)}
      >
        Back to group
      </button>
    </div>
  )
}
