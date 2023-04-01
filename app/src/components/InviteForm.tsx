import { InviteRequest, inviteRequestSchema } from '../schemata/invite-request'

export interface InviteFormProps {
  onSubmit: (data: InviteRequest) => void
  isLoading: boolean
}

export default function InviteForm({ onSubmit, isLoading }: InviteFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (isLoading) return

        const form = event.target as unknown as { email: HTMLInputElement }
        const formData = { email: form.email.value }

        try {
          const inviteRequest = inviteRequestSchema.parse(formData)
          onSubmit(inviteRequest)
        } catch (e) {
          console.error(e)
        }
      }}
      className="flex gap-2 flex-col"
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
        className="bg-white rounded-full px-4 py-2 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-300"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Invite'}
      </button>
    </form>
  )
}
