import './Navbar.css';
import React from "react";
import {
  Link
} from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/sign_up">Sign Up</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
