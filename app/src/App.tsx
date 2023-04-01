import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
