import { useContext } from 'react'
import { ApiContext } from '../contexts/api-context'
import LogInForm from '../components/LogInForm'
import { LogInRequest } from '../schemata/log-in-request'
import { useNavigate } from 'react-router-dom'
import useAsync from '../hooks/use-async'
import ErrorText from '../components/ErrorText'
import Layout from '../components/Layout'

export default function LogIn() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()

  const {
    go: submit,
    isLoading,
    error,
  } = useAsync(async (request: LogInRequest) => {
    await api.logIn(request)
    navigate('/groups')
  })

  return (
    <Layout
      title="Welcome back"
      onHome={() => navigate('/')}
      onBack={() => navigate('/')}
    >
      <LogInForm onSubmit={submit} isLoading={isLoading} />
      <ErrorText error={error} />
      <button
        onClick={() => navigate('/signup')}
        className="text-white underline hover:text-yellow-200"
      >
        Sign up for a new account.
      </button>
    </Layout>
  )
}
