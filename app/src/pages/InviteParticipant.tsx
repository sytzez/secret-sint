import InviteForm from '../components/InviteForm'
import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate, useParams } from 'react-router-dom'
import { InviteRequest } from '../schemata/invite-request'

export default function InviteParticipant() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { groupId } = useParams()

  const onSubmit = async (request: InviteRequest) => {
    setLoading(true)
    try {
      await api.invite(parseInt(groupId), request)
      navigate('..')
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-4">
        Invite a participant
      </h1>
      <InviteForm onSubmit={onSubmit} isLoading={isLoading} />
      <p className="my-4 text-white">{error}</p>
    </div>
  )
}
