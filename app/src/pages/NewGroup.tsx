import GroupForm from '../components/GroupForm'
import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import { GroupRequest } from '../schemata/group-request'

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
    <>
      <h1 className="text-white text-2xl font-bold mb-4">New group</h1>
      <GroupForm
        submitLabel="Create group"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <p className="my-4 text-white">{error}</p>
    </>
  )
}
