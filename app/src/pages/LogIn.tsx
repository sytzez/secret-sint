import { useContext, useState } from "react";
import { ApiContext } from "../contexts/api-context";
import LogInForm from "../components/LogInForm";
import { LogInRequest } from "../schemata/log-in-request";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const api = useContext(ApiContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (request: LogInRequest) => {
    setLoading(true)
    try {
      await api.logIn(request)
      navigate('/groups')
    } catch(e: { message: string }) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md m-auto">
      <h1 className="text-white text-2xl font-bold mb-4">Welcome back</h1>
      <LogInForm onSubmit={onSubmit} isLoading={isLoading} />
      <p className="my-4 text-white">{error}</p>
      <a
        href="/signup"
        className="text-white underline hover:text-yellow-200"
      >
        Sign up for a new account.
      </a>
    </div>
  )
}
