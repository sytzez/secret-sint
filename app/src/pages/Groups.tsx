import { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { Group } from '../schemata/group'
import { useNavigate } from 'react-router-dom'

export default function Groups() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .groups()
      .then(setGroups)
      .catch((e: { message: string }) => {
        setError(e.message)
      })
  }, [])

  if (error) return <p className="text-white">{error}</p>

  if (!groups) return <p className="text-white">Loading</p>

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-4">Select a group</h1>
      {groups.length === 0 && (
        <p className="text-white mb-2 italic">
          Your groups will be shown here. Start a new group or ask someone to
          invite you to theirs.
        </p>
      )}
      <ul className="mb-2">
        {groups.map((group) => (
          <li
            key={group.id}
            className="text-yellow-200 text-center border-b-2 border-b-red-700 last:border-b-0 p-4 cursor-pointer hover:underline hover:text-white"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            {group.title}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg"
        onClick={() => navigate('/groups/new')}
      >
        New group
      </button>
    </div>
  )
}
