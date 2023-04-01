import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Groups from "./pages/Groups";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
