import GroupForm from '../components/GroupForm'
import { Group } from '../schemata/group'
import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'

export default function NewGroup() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (request: Group) => {
    setLoading(true)
    try {
      const group = await api.createGroup(request)
      console.log(group) // TODO: go to group detail
    } catch (e: { message: string }) {
      setError(e.mesage)
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
