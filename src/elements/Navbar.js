import './Navbar.css';
import React from "react";
import {
  NavLink
} from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li><NavLink to="/feed" className={(navData) => navData.isActive ? "selected" : "" }>Feed</NavLink></li>
        <li><NavLink to="/profile" className={(navData) => navData.isActive ? "selected" : "" }>Profile</NavLink></li>
        <li><NavLink to="/sign_up" className={(navData) => navData.isActive ? "selected" : "" }>Sign Up</NavLink></li>
      </ul>
    </div>
  );
}

export default Navbar;
