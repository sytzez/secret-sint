import { SignUpRequest, signUpRequestSchema } from "../schemata/sign-up-request";

export default function SignUpForm({ onSubmit }: { onSubmit: (data: SignUpRequest) => void }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

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
        className="bg-white rounded-full px-4 py-2"
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
        className="bg-white rounded-full px-4 py-2"
        minLength={8}
      />
      <button
        type="submit"
        className="rounded-full border text-white border-white border-solid p-4 hover:bg-red-700 mt-2"
      >
        Sign up
      </button>
    </form>
  )
}
