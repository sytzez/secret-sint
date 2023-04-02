import { SignUpRequest, signUpRequestSchema } from '../schemata/sign-up-request'
import useForm from "../hooks/use-form";
import Form from "./Form";

export interface SignUpFormProps {
  onSubmit: (data: SignUpRequest) => void
  isLoading: boolean
}

export default function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const [submit, error] = useForm(signUpRequestSchema, ['email', 'password'], onSubmit)

  return (
    <Form
      submitLabel="Sign up"
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <label htmlFor="email" className="text-white">
        Email
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        id="email"
        name="email"
        placeholder="Your email address"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        required
        type="password"
        autoComplete="new-password"
        id="password"
        name="password"
        placeholder="Your password"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        minLength={8}
        disabled={isLoading}
      />
    </Form>
  )
}
