import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "./NavBar.scss";

const NavBar = () => {
  return (
    <header className="nav-bar">
      <h1>Mister Mind</h1>
      <nav>
        <ul>
          <NavLink
            className={({ isActive }) => (isActive ? "active nav" : "nav")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active nav" : "nav")}
            to="/register"
          >
            Registe r
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active nav" : "nav")}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active nav" : "nav")}
            to="/logout"
          >
            Logout
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
