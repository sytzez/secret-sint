import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Groups from './pages/Groups'
import NewGroup from './pages/NewGroup'
import GroupDetail from './pages/GroupDetail'

function App() {
  return (
    <div className="max-w-md m-auto py-8 px-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/new" element={<NewGroup />} />
          <Route path="/groups/:groupId" element={<GroupDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
