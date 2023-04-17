import { useContext, useEffect } from 'react'
import { ApiContext } from '../contexts/api-context'
import { useNavigate } from 'react-router-dom'
import useAsync from '../hooks/use-async'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import ErrorText from '../components/ErrorText'

export default function Groups() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()

  const {
    go: loadGroups,
    result: groups,
    isLoading,
    error,
  } = useAsync(async () => await api.groups())

  useEffect(loadGroups, [])

  return (
    <Layout
      title="Select a group"
      onHome={() => navigate('/groups')}
      onLogOut={api.logOut}
    >
      <ErrorText error={error} />
      {isLoading && <Loading />}
      {groups && (
        <>
          {groups.length === 0 && (
            <p className="text-white mb-2 italic">
              Your groups will be shown here. Start a new group or ask someone
              to invite you to theirs.
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
        </>
      )}
      <button
        type="button"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg"
        onClick={() => navigate('/groups/new')}
      >
        New group
      </button>
    </Layout>
  )
}
