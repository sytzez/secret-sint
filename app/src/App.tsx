import SignUp from './pages/SignUp'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Groups from './pages/Groups'
import NewGroup from './pages/NewGroup'
import GroupDetail from './pages/GroupDetail'
import InviteParticipant from './pages/InviteParticipant'
import EditWishlist from './pages/EditWishlist'
import AssigneeDetails from './pages/AssigneeDetails'

function App() {
  return (
    <div className="max-w-md m-auto py-8 px-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/groups" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/new" element={<NewGroup />} />
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          <Route
            path="/groups/:groupId/invite"
            element={<InviteParticipant />}
          />
          <Route path="/groups/:groupId/wishlist" element={<EditWishlist />} />
          <Route
            path="/groups/:groupId/assignee"
            element={<AssigneeDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
