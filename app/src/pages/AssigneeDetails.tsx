import { useContext, useEffect } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate, useParams } from 'react-router-dom'
import useAsync from '../hooks/use-async'
import Button from '../components/Button'
import Layout from '../components/Layout'

export default function AssigneeDetails() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const { groupId } = useParams()

  const {
    go: loadParticipant,
    result: participant,
    error,
  } = useAsync(async () => await api.assignee(Number(groupId)))

  useEffect(loadParticipant, [groupId])

  if (error) return <p className="text-white">{error}</p>
  if (!participant) return <p className="text-white">Loading...</p>

  return (
    <Layout
      title="Your assignee"
      onHome={() => navigate('/groups')}
      onBack={() => navigate(`/groups/${groupId}`)}
    >
      <p className="text-white">You are assigned to:</p>
      <p className="text-center text-yellow-200 mb-2">
        {participant.user!.email}
      </p>
      <p className="text-white">This is their wishlist:</p>
      <p className="text-yellow-200 mb-2 px-6 whitespace-pre">
        {participant.wishlist!}
      </p>
      <div className="mt-6">
        <Button
          label="Back to group"
          onClick={() => navigate(`/groups/${groupId}`)}
          style="secondary"
        />
      </div>
    </Layout>
  )
}
