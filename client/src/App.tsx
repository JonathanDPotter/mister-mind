import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// components
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";

const FadeRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup key={location.key}>
      <CSSTransition timeout={3000} classNames="fade">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/game" element={<h1>Game</h1>} />
          <Route path="/scores" element={<h1>Scores</h1>} />
          <Route path="/leader" element={<h1>Leader</h1>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <Router>
      <NavBar />
      <FadeRoutes />
    </Router>
  );
}

export default App;
