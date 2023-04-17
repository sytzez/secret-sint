import { SignUpRequest, signUpRequestSchema } from '../schemata/sign-up-request'
import useForm from '../hooks/use-form'
import Form from './Form'
import Input from './Input'

export interface SignUpFormProps {
  onSubmit: (data: SignUpRequest) => void
  isLoading: boolean
}

export default function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const [submit, error] = useForm(
    signUpRequestSchema,
    ['email', 'password', 'password_confirmation'],
    onSubmit,
  )

  return (
    <Form
      submitLabel="Sign up"
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Your email address"
        autocomplete="email"
        disabled={isLoading}
        autoFocus
      />
      <Input
        minLength={8}
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        autocomplete="new-password"
        disabled={isLoading}
      />
      <Input
        name="password_confirmation"
        label="Confirm password"
        type="password"
        placeholder="Your password"
        autocomplete="password"
        disabled={isLoading}
      />
    </Form>
  )
}
