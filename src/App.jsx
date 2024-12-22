import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./componets/Login"
import Home from "./componets/Home"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
