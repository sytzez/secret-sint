import { InviteRequest, inviteRequestSchema } from '../schemata/invite-request'
import useForm from "../hooks/use-form";
import ErrorText from "../ErrorText";
import Form from "./Form";

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
      <label htmlFor="email" className="text-white">
        Email address
      </label>
      <input
        required
        type="email"
        autoComplete="none"
        id="email"
        name="email"
        placeholder="Their email address"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
    </Form>
  )
}
