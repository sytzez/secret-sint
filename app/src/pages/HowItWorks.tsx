import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import usePepernoten from "../hooks/use-pepernoten";
import Button from "../components/Button";
import createAGroupImage from '../assets/screenshots/create-a-group.png'
import addingParticipantsImage from '../assets/screenshots/adding-participants.png'
import editingAWishlistImage from '../assets/screenshots/editing-a-wishlist.png'

export default function HowItWorks() {
  const navigate = useNavigate()

  usePepernoten()

  return (
    <Layout
      title="How it works"
      onBack={() => navigate('/')}
      onHome={() => navigate('/')}
    >
      <h2 className="text-white text-3xl drop-shadow-lg">Create your own group</h2>
      <img
        src={createAGroupImage}
        width="80%"
        alt="Naming a new group"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg text-right">Add your friends</h2>
      <img
        src={addingParticipantsImage}
        width="80%"
        alt="Adding participants to a group"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl"
        style={{ transform: 'perspective(800px) rotate3d(-.5, -1, 0, -15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg">Everyone fills in their wishlist, privately</h2>
      <img
        src={editingAWishlistImage}
        width="80%"
        alt="Editing a wishlist"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg text-right">The app assigns everyone a Secret Sint!</h2>

      <h2 className="text-white text-3xl drop-shadow-lg">Order a present for your secretly assigned friend</h2>

      <h2 className="text-white text-3xl drop-shadow-lg text-right">Watch the progress of all present deliveries</h2>

      <Button
        onClick={() => navigate('/signup')}
        label="Create an account to get started"
        style="primary"
      />
    </Layout>
  )
}
