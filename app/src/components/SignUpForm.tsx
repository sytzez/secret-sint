import { SignUpRequest, signUpRequestSchema } from "../schemata/sign-up-request";

export interface SignUpFormProps {
  onSubmit: (data: SignUpRequest) => void,
  isLoading: boolean,
}

export default function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (isLoading) {
          return
        }

        const form = event.target as unknown as { email: HTMLInputElement, password: HTMLInputElement }

        const formData = {
          email: form.email.value,
          password: form.password.value,
        }

        try {
          const signUpRequest = signUpRequestSchema.parse(formData)
          onSubmit(signUpRequest)
        } catch (e) {
          console.error(e)
        }
      }}
      className="flex gap-2 flex-col"
    >
      <label
        htmlFor="email"
        className="text-white"
      >
        Email:
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        id="email"
        name="email"
        placeholder="Your email address"
        className="bg-white rounded-full px-4 py-2 disabled:bg-gray-300"
        disabled={isLoading}
      />
      <label
        htmlFor="password"
        className="text-white"
      >
        Password:
      </label>
      <input
        required
        type="password"
        autoComplete="new-password"
        id="password"
        name="password"
        placeholder="Your password"
        className="bg-white rounded-full px-4 py-2 disabled:bg-gray-300"
        minLength={8}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="rounded-full border text-white border-white border-solid p-4 hover:bg-red-700 mt-2"
        disabled={isLoading}
      >
        { isLoading ? '...' : 'Sign up' }
      </button>
    </form>
  )
}
