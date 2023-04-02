import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import LogInForm from '../components/LogInForm'
import { LogInRequest } from '../schemata/log-in-request'
import { useNavigate } from 'react-router-dom'
import useAsync from '../hooks/use-async'

export default function LogIn() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()

  const [submit, , isLoading, error] = useAsync(
    async (request: LogInRequest) => {
      await api.logIn(request)
      navigate('/groups')
    },
  )

  return (
    <>
      <h1 className="text-white text-2xl font-bold mb-4">Welcome back</h1>
      <LogInForm onSubmit={submit} isLoading={isLoading} />
      <p className="my-4 text-white">{error}</p>
      <button
        onClick={() => navigate('/signup')}
        className="text-white underline hover:text-yellow-200"
      >
        Sign up for a new account.
      </button>
    </>
  )
}
