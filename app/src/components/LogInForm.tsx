import { LogInRequest, logInRequestSchema } from '../schemata/log-in-request'

export interface LogInFormProps {
  onSubmit: (data: LogInRequest) => void
  isLoading: boolean
}

export default function LogInForm({ onSubmit, isLoading }: LogInFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (isLoading) {
          return
        }

        const form = event.target as unknown as {
          email: HTMLInputElement
          password: HTMLInputElement
        }

        const formData = {
          email: form.email.value,
          password: form.password.value,
        }

        try {
          const logInRequest = logInRequestSchema.parse(formData)
          onSubmit(logInRequest)
        } catch (e) {
          console.error(e)
        }
      }}
      className="flex gap-2 flex-col"
    >
      <label htmlFor="email" className="text-white">
        Email
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        id="email"
        name="email"
        placeholder="Your email address"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        required
        type="password"
        autoComplete="new-password"
        id="password"
        name="password"
        placeholder="Your password"
        className="bg-white rounded-full p-4 disabled:bg-gray-300 shadow-lg mb-2"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="rounded-full font-bold p-4 bg-yellow-400 hover:bg-yellow-500 shadow-lg disabled:bg-gray-300"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Log in'}
      </button>
    </form>
  )
}
