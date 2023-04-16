import SignUpForm from '../components/SignUpForm'
import { useContext } from 'react'
import { ApiContext } from '../contexts/api-context'
import { SignUpRequest } from '../schemata/sign-up-request'
import { useNavigate } from 'react-router-dom'
import useAsync from '../hooks/use-async'
import ErrorText from '../components/ErrorText'
import Layout from '../components/Layout'

export default function SignUp() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()

  const {
    go: submit,
    isLoading,
    error,
  } = useAsync(async (request: SignUpRequest) => {
    await api.signUp(request)
    navigate('/groups')
  })

  return (
    <Layout
      title="Create an account"
      onBack={() => navigate('/')}
      onHome={() => navigate('/')}
    >
      <SignUpForm onSubmit={submit} isLoading={isLoading} />
      <ErrorText error={error} />
      <button
        onClick={() => navigate('/login')}
        className="text-white underline hover:text-yellow-200"
      >
        Already have an account? Log in instead.
      </button>
    </Layout>
  )
}
