import { useState } from 'react'
import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
