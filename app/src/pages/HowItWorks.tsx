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
      onBack={() => navigate('/')}
      onHome={() => navigate('/')}
    >
      <h2 className="text-white text-xl font-bold drop-shadow-lg">Create a new group</h2>
      <img
        src={createAGroupImage}
        alt="Naming a new group"
        className="shadow-xl mb-4"
      />

      <h2 className="text-white text-xl font-bold drop-shadow-lg text-right">Add your friends</h2>
      <img
        src={addingParticipantsImage}
        alt="Adding participants to a group"
        className="shadow-xl mb-4 text-right"
      />

      <h2 className="text-white text-xl font-bold drop-shadow-lg">Everyone fills in their wishlist, privately</h2>
      <img
        src={editingAWishlistImage}
        alt="Editing a wishlist"
        className="shadow-xl mb-4"
      />

      <h2 className="text-white text-xl font-bold drop-shadow-lg text-right">The app assigns everyone a Secret Sint!</h2>
      <h2 className="text-white text-xl font-bold drop-shadow-lg">Order a present for your secretly assigned friend</h2>
      <h2 className="text-white text-xl font-bold drop-shadow-lg text-right">Watch the progress of all present deliveries</h2>
      <Button
        onClick={() => navigate('/signup')}
        label="Create an account to get started"
        style="primary"
      />
    </Layout>
  )
}
