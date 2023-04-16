import GroupForm from '../components/GroupForm'
import { useContext } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import { GroupRequest } from '../schemata/group-request'
import ErrorText from '../components/ErrorText'
import useAsync from '../hooks/use-async'
import Layout from '../components/Layout'

export default function NewGroup() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()

  const {
    go: submit,
    isLoading,
    error,
  } = useAsync(async (request: GroupRequest) => {
    const group = await api.createGroup(request)
    navigate(`/groups/${group.id}`)
  })

  return (
    <Layout
      title="New group"
      onHome={() => navigate('/groups')}
      onBack={() => navigate('/groups')}
    >
      <GroupForm
        submitLabel="Create group"
        onSubmit={submit}
        isLoading={isLoading}
      />
      <ErrorText error={error} />
      <button
        className="rounded-full border border-red-300 text-white p-4 bg-red-600 hover:bg-red-700 shadow-lg mt-4"
        onClick={() => navigate('/groups')}
      >
        Back to all groups
      </button>
    </Layout>
  )
}
