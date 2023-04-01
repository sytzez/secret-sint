export default function SignUpForm() {
  return (
    <form className="flex gap-2 flex-col">
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
