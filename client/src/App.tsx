import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>This is the App.</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/Register" element={<h1>Register</h1>} />
        <Route path="/Game" element={<h1>Game</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
