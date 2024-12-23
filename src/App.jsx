import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./componets/Login"
import Home from "./componets/Home"
import ProtectedRoute from "./componets/ProtectedRoute"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
