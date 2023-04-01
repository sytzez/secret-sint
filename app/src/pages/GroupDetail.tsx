import { useContext, useEffect, useState } from 'react'
import { Group } from '../schemata/group'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiContext } from '../contexts/api-context'

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

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-4">{group.title}</h1>
      <h2 className="text-white text-lg font-bold mb-2">Participants</h2>
      <ul className="mb-4">
        {group.users.map((user) => (
          <li
            key={user.email}
            className="text-white text-center border-b border-b-white last:border-b-0 p-2"
          >
            {user.email}
          </li>
        ))}
      </ul>
      {group.has_started ? (
        <p>TODO: progress of presents</p>
      ) : (
        <>
          <button
            type="button"
            className="rounded-full border border-white text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg"
            onClick={() => navigate('./invite')}
          >
            Invite participants
          </button>
          <button
            type="button"
            className="rounded-full border border-white text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg"
            onClick={console.log}
          >
            Edit wishlist
          </button>
          <button
            type="button"
            className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg"
          >
            Assign Secret Sints!
          </button>
          <p>TODO: wishlist, don't let them assign sints before everyone submitted their wishlist</p>
          <p className="text-white">
            Once the Secret Sints have been assigned, you can not invite any
            more participants.
          </p>
          <button
            type="button"
            className="rounded-full border border-white text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
            onClick={() => navigate('..')}
          >
            Back to all groups
          </button>
        </>
      )}
    </div>
  )
}
