import { GroupRequest, groupRequestSchema } from '../schemata/group-request'

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
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (isLoading) {
          return
        }

        const form = event.target as unknown as { title: HTMLInputElement }

        const formData = {
          title: form.title.value,
        }

        try {
          const group = groupRequestSchema.parse(formData)
          onSubmit(group)
        } catch (e) {
          console.error(e)
        }
      }}
      className="flex gap-2 flex-col"
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
      <button
        type="submit"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-300"
        disabled={isLoading}
      >
        {isLoading ? '...' : submitLabel}
      </button>
    </form>
  )
}
