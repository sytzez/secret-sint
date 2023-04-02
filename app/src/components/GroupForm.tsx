import { GroupRequest, groupRequestSchema } from '../schemata/group-request'
import useForm from "../hooks/use-form";
import Form from "./Form";
import Input from "./Input";

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
      <Input
        name="title"
        label="Name"
        placeholder="The name of the group"
        disabled={isLoading}
      />
    </Form>
  )
}
