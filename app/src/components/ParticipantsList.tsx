import { User } from '../schemata/user'

export interface ParticipantsListProps {
  users: User[]
  canAdd: boolean
  onAdd: () => void
}

export default function ParticipantsList({
  users,
  canAdd,
  onAdd,
}: ParticipantsListProps) {
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.email}
            className="text-yellow-200 text-center border-b-2 border-b-red-700 last:border-b-0 p-4"
          >
            {user.email}
          </li>
        ))}
      </ul>
      {canAdd && (
        <button
          type="button"
          className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mb-2"
          onClick={onAdd}
        >
          Add participants
        </button>
      )}
    </>
  )
}
