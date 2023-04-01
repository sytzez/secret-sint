import SignUpForm from '../components/SignUpForm'
import { useContext, useState } from "react";
import { ApiContext } from "../contexts/api-context";
import { SignUpRequest } from "../schemata/sign-up-request";

export default function SignUp() {
  const api = useContext(ApiContext)
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (request: SignUpRequest) => {
    setLoading(true)

    const result = await api.signUp(request)

    setLoading(false)
  }

  return (
    <div className="max-w-md m-auto">
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}
