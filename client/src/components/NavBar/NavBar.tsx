import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <header className="nav-bar">
      <h1>Mister Mind</h1>
      <nav>
        <ul>
          <NavLink className="nav-link" to="/login">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Registe r
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
