import sinterklaasImage from '../assets/sinterklaas.png'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function Start() {
  const navigate = useNavigate()

  return (
    <>
      <img src={sinterklaasImage} alt="Secret Sint Logo" />
      <h1 className="text-white xs:text-8xl text-6xl text-center font-logo drop-shadow-lg shadow-black mb-1">
        Secret Sint
      </h1>
      <p className="text-white text-lg text-center mb-6">
        Easily organise Secret Sint groups and keep track of the deliveries.
      </p>
      <Button
        label="Log in"
        style="primary"
        onClick={() => navigate('/login')}
      />
      <Button
        label="Create an account"
        style="secondary"
        onClick={() => navigate('/signup')}
      />
    </>
  )
}
