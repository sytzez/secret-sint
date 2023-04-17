import { InviteRequest, inviteRequestSchema } from '../schemata/invite-request'
import useForm from '../hooks/use-form'
import Form from './Form'
import Input from './Input'

export interface InviteFormProps {
  onSubmit: (data: InviteRequest) => void
  isLoading: boolean
}

export default function InviteForm({ onSubmit, isLoading }: InviteFormProps) {
  const [submit, error] = useForm(inviteRequestSchema, ['email'], onSubmit)

  return (
    <Form
      submitLabel="Invite"
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <Input
        name="email"
        type="email"
        label="Email address"
        placeholder="Their email address"
        autocomplete="none"
        disabled={isLoading}
        autoFocus
      />
    </Form>
  )
}
