import SignUpForm from '../components/SignUpForm'
import { useContext, useState } from "react";
import { ApiContext } from "../contexts/api-context";
import { SignUpRequest } from "../schemata/sign-up-request";

export default function SignUp() {
  const api = useContext(ApiContext)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (request: SignUpRequest) => {
    setLoading(true)
    try {
      await api.signUp(request)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md m-auto">
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
      <p className="my-4 text-white">{error}</p>
    </div>
  )
}
