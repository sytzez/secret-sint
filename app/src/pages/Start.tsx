import sinterklaasImage from '../assets/sinterklaas.png'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import usePepernoten from '../hooks/use-pepernoten'

export default function Start() {
  const navigate = useNavigate()

  usePepernoten()

  return (
    <div className="max-w-md m-auto pb-8 px-2">
      <img
        src={sinterklaasImage}
        alt="Secret Sint Logo"
        width={432}
        height={432}
      />
      <h1 className="text-white xs:text-8xl text-6xl text-center font-logo drop-shadow-lg shadow-black mb-1">
        Secret Sint
      </h1>
      <p className="text-white text-lg text-center mb-6">
        Easily organise Secret Sint groups and keep track of the deliveries.
      </p>
      <Button
        label="Get started"
        style="primary"
        onClick={() => navigate('/signup')}
      />
      <Button
        label="How it works"
        style="secondary"
        onClick={() => navigate('/how-it-works')}
      />
    </div>
  )
}
