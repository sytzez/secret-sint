import { LogInRequest, logInRequestSchema } from '../schemata/log-in-request'
import useForm from '../hooks/use-form'
import Form from './Form'
import Input from './Input'

export interface LogInFormProps {
  onSubmit: (data: LogInRequest) => void
  isLoading: boolean
}

export default function LogInForm({ onSubmit, isLoading }: LogInFormProps) {
  const [submit, error] = useForm(
    logInRequestSchema,
    ['email', 'password'],
    onSubmit,
  )

  return (
    <Form
      submitLabel="Log in"
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
        name="password"
        label="Password"
        type="password"
        placeholder="Your password"
        autocomplete="password"
        disabled={isLoading}
      />
    </Form>
  )
}
