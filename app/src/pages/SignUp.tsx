import SignUpForm from '../components/SignUpForm'
import { useContext, useState } from 'react'
import { ApiContext } from '../contexts/api-context'
import { SignUpRequest } from '../schemata/sign-up-request'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (request: SignUpRequest) => {
    setLoading(true)
    try {
      await api.signUp(request)
      navigate('/groups')
    } catch (e: { message: string }) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <>
      <h1 className="text-white text-2xl font-bold mb-4">Create an account</h1>
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
      <p className="my-4 text-white">{error}</p>
      <a href="/login" className="text-white underline hover:text-yellow-200">
        Already have an account? Log in instead.
      </a>
    </>
  )
}
