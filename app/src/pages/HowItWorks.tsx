import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import usePepernoten from '../hooks/use-pepernoten'
import Button from '../components/Button'
import createAGroupImage from '../assets/screenshots/create-a-group.png'
import addingParticipantsImage from '../assets/screenshots/adding-participants.png'
import editingAWishlistImage from '../assets/screenshots/editing-a-wishlist.png'
import assignSecretSintsImage from '../assets/screenshots/assign-secret-sints.png'
import yourAssigneeImage from '../assets/screenshots/your-assignee.png'
import presentStatusImage from '../assets/screenshots/present-status.png'
import groupProgressImage from '../assets/screenshots/group-progress.png'

export default function HowItWorks() {
  const navigate = useNavigate()

  usePepernoten()

  return (
    <Layout
      title="How it works"
      onBack={() => navigate('/')}
      onHome={() => navigate('/')}
    >
      <h2 className="text-white text-3xl drop-shadow-lg">Create a group</h2>
      <img
        src={createAGroupImage}
        width="80%"
        alt="Naming a new group"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg text-right">
        Add your friends
      </h2>
      <img
        src={addingParticipantsImage}
        width="80%"
        alt="Adding participants to a group"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl"
        style={{ transform: 'perspective(800px) rotate3d(-.5, -1, 0, -15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg">
        Everyone fills in their wishlist, privately
      </h2>
      <img
        src={editingAWishlistImage}
        width="80%"
        alt="Editing a wishlist"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg text-right">
        The app assigns everyone a Secret Sint!
      </h2>
      <img
        src={assignSecretSintsImage}
        width="80%"
        alt="A group with complete wishlist; the Assign Secret Sints button is available"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl"
        style={{ transform: 'perspective(800px) rotate3d(-.5, -1, 0, -15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg">
        Order a present for your secretly assigned friend
      </h2>
      <img
        src={yourAssigneeImage}
        width="80%"
        alt="The app showing your assignee and their wishlist"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg text-right">
        Let the app know about your order
      </h2>
      <img
        src={presentStatusImage}
        width="80%"
        alt="Updating your present status to 'Ordered'"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl"
        style={{ transform: 'perspective(800px) rotate3d(-.5, -1, 0, -15deg)' }}
      />

      <h2 className="text-white text-3xl drop-shadow-lg">
        Sit back and follow the group&apos;s progress
      </h2>
      <img
        src={groupProgressImage}
        width="80%"
        alt="A group's progress, showing how many Sints have ordered their presents and how many have been delivered"
        className="shadow-xl mb-20 border-8 border-gray-800 rounded-3xl ml-auto"
        style={{ transform: 'perspective(800px) rotate3d(.5, -1, 0, 15deg)' }}
      />

      <Button
        onClick={() => navigate('/signup')}
        label="Get started"
        style="primary"
      />
    </Layout>
  )
}
