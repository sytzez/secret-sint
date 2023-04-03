import { ParticipationRequest, participationRequestSchema } from "../schemata/participation-request";
import { Participation } from "../schemata/participation";
import useForm from "../hooks/use-form";
import Form from "./Form";

export interface PresentStatusFormProps {
  onSubmit: (data: ParticipationRequest) => void
  isLoading: boolean
  value: Participation
}


export default function PresentStatusForm({
  onSubmit,
  isLoading,
  value,
}: PresentStatusFormProps) {
  const [submit, error] = useForm(
    participationRequestSchema,
    ['present_status'],
    onSubmit,
  )

  return (
    <Form
      submitLabel="Save wishlist"
      onSubmit={submit}
      isLoading={isLoading}
      error={error}
    >
      <select
        required
        id="present_status"
        name="present_status"
        defaultValue={value.present_status}
      >
        <option value="not_started">Not started</option>
        <option value="ordered">Ordered</option>
        <option value="delivered">Delivered</option>
      </select>
    </Form>
  )
}
