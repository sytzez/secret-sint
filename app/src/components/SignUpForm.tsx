import { SignUpRequest, signUpRequestSchema } from '../schemata/sign-up-request'
import useForm from "../hooks/use-form";
import Form from "./Form";
import Input from "./Input";

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
      <Input
        name="email"
        label="Email"
        placeholder="Your email address"
        autocomplete="email"
        disabled={isLoading}
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
    </Form>
  )
}
