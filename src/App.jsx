import React from "react"
import { BrowserRouter as Router, Route, Routes , Navigate} from "react-router-dom"
import Login from "./componets/Login"
import Home from "./componets/Home"
import ProtectedRoute from "./componets/ProtectedRoute"

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
