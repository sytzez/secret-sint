import { useContext, useEffect, useState } from 'react'
import { Group } from '../schemata/group'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/api-context'
import ProgressBar from '../components/ProgressBar'
import ParticipantsList from '../components/ParticipantsList'
import Button from '../components/Button'
import GroupProgress from '../components/GroupProgress'

export default function GroupDetail() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [group, setGroup] = useState<Group | null>(null)
  const [error, setError] = useState('')
  const { groupId } = useParams()

  useEffect(() => {
    api
      .group(Number(groupId))
      .then(setGroup)
      .catch((e: { message: string }) => {
        setError(e.message)
      })
  }, [groupId])

  if (error) return <p className="text-white">{error}</p>

  if (!group) return <p className="text-white">Loading</p>

  const canAssignSecretSints =
    group.users &&
    group.users.length >= 3 &&
    group.wishlist_count === group.users.length

  const assignSecretSints = async () => {
    await api.assignSecretSints(group.id)
    navigate('.')
  }

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-4">{group.title}</h1>
      {!group.has_started && (
        <Button
          label="Edit your wishlist"
          onClick={() => navigate(`/groups/${group.id}/wishlist`)}
          style="secondary"
        />
      )}
      {group.has_started && (
        <Button
          label="View your recipient"
          onClick={() => {}}
          style="secondary"
        />
      )}
      <h2 className="text-white text-lg font-bold mt-2">Participants</h2>
      <ParticipantsList
        users={group.users!}
        canAdd={!group.has_started}
        onAdd={() => navigate(`/groups/${group.id}/invite`)}
      />
      <h2 className="text-white text-lg font-bold mt-2">Progress</h2>
      <GroupProgress group={group} />
      {!group.has_started && (
        <>
          <Button
            label="Assign Secret Sints!"
            onClick={assignSecretSints}
            disabled={!canAssignSecretSints}
            style="primary"
          />
          <p className="text-white mb-2">
            Once the Secret Sints have been assigned, you can not invite any
            more participants, nor can anyone change their wishlists.
          </p>
        </>
      )}
      <div className="mt-4">
        <Button
          label="Back to all groups"
          onClick={() => navigate('/groups')}
          style="secondary"
        />
      </div>
    </div>
  )
}
