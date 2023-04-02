import { User } from '../schemata/user'
import Button from './Button'

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
        <Button label="Add participants" onClick={onAdd} style="secondary" />
      )}
    </>
  )
}
