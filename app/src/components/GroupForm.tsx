import { GroupRequest, groupRequestSchema } from '../schemata/group-request'
import useForm from "../hooks/use-form";
import Form from "./Form";

export interface GroupFormProps {
  onSubmit: (data: GroupRequest) => void
  isLoading: boolean
  submitLabel: string
}

export default function GroupForm({
  onSubmit,
  isLoading,
  submitLabel,
}: GroupFormProps) {
  const [submit, error] = useForm(groupRequestSchema, ['title'], onSubmit)

  return (
    <Form
      submitLabel={submitLabel}
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <label htmlFor="name" className="text-white">
        Name
      </label>
      <input
        required
        type="title"
        autoComplete="none"
        id="title"
        name="title"
        placeholder="The name of the group"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
    </Form>
  )
}
