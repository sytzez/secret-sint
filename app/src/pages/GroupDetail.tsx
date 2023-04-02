import { useContext, useEffect, useState } from 'react'
import { Group } from '../schemata/group'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/api-context'
import ProgressBar from '../components/ProgressBar'
import ParticipantsList from '../components/ParticipantsList'

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
      <button
        className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mb-2"
        onClick={() => navigate(`/groups/${group.id}/wishlist`)}
      >
        Edit your wishlist
      </button>
      <h2 className="text-white text-lg font-bold mt-2">Participants</h2>
      <ParticipantsList
        users={group.users!}
        canAdd={!group.has_started}
        onAdd={() => navigate(`/groups/${group.id}/invite`)}
      />
      {group.has_started ? (
        <p>TODO: progress of presents</p>
      ) : (
        <>
          <h2 className="text-white text-lg font-bold mt-2">Progress</h2>
          {group.users!.length < 3 && (
            <div className="mb-2">
              <p className="text-white mb-1">
                You need a least 3 participants to play Secret Sint.
              </p>
              <ProgressBar progress={group.users!.length / 3} />
            </div>
          )}
          {group.users!.length > 1 && (
            <div className="mb-2">
              <p className="text-white mb-1">
                {group.wishlist_count!} out of {group.users!.length} people have
                written their wishlist.
              </p>
              <ProgressBar
                progress={group.wishlist_count! / group.users!.length}
              />
            </div>
          )}
          <button
            type="button"
            className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-400"
            disabled={!canAssignSecretSints}
            onClick={assignSecretSints}
          >
            Assign Secret Sints!
          </button>
          <p className="text-white mb-2">
            Once the Secret Sints have been assigned, you can not invite any
            more participants, nor can anyone change their wishlists.
          </p>
          <button
            className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
            onClick={() => navigate('/groups')}
          >
            Back to all groups
          </button>
        </>
      )}
    </div>
  )
}
