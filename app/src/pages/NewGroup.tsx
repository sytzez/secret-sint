import GroupForm from '../components/GroupForm'
import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import { GroupRequest } from '../schemata/group-request'
import ErrorText from "../ErrorText";

export default function NewGroup() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (request: GroupRequest) => {
    setLoading(true)
    try {
      const group = await api.createGroup(request)
      navigate(`/groups/${group.id}`)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex gap-2 flex-col">
      <h1 className="text-white text-2xl font-bold mb-2">New group</h1>
      <GroupForm
        submitLabel="Create group"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <ErrorText error={error} />
      <button
        className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
        onClick={() => navigate('/groups')}
      >
        Back to all groups
      </button>
    </div>
  )
}
