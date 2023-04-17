import SignUp from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Groups from './pages/Groups'
import NewGroup from './pages/NewGroup'
import GroupDetail from './pages/GroupDetail'
import InviteParticipant from './pages/InviteParticipant'
import EditWishlist from './pages/EditWishlist'
import AssigneeDetails from './pages/AssigneeDetails'
import EditPresentStatus from './pages/EditPresentStatus'
import Start from './pages/Start'
import HowItWorks from './pages/HowItWorks'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/new" element={<NewGroup />} />
      <Route path="/groups/:groupId" element={<GroupDetail />} />
      <Route path="/groups/:groupId/invite" element={<InviteParticipant />} />
      <Route path="/groups/:groupId/wishlist" element={<EditWishlist />} />
      <Route path="/groups/:groupId/assignee" element={<AssigneeDetails />} />
      <Route
        path="/groups/:groupId/present-status"
        element={<EditPresentStatus />}
      />
    </Routes>
  )
}

export default App
