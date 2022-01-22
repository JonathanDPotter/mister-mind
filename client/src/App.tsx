import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/Register" element={<h1>Register</h1>} />
        <Route path="/game" element={<h1>Game</h1>} />
        <Route path="/scores" element={<h1>Scores</h1>} />
        <Route path="/leader" element={<h1>Leader</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
