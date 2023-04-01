import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <div className="max-w-lg m-auto">
      <SignUpForm onSubmit={console.log} />
    </div>
  )
}
