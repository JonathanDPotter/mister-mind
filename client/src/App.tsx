import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// components
import Framer from "./components/Framer/Framer";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";

const App = () => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <AnimatePresence exitBeforeEnter={true}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Framer Component={<Home />} />} />
          <Route
            path="/Register"
            element={<Framer Component={<Register />} />}
          />
          <Route path="*" element={<Framer Component={<h1>Not Found</h1>} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
