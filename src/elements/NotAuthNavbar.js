import './Navbar.css';
import React from "react";
import {
  NavLink
} from "react-router-dom";

function NotAuthNavbar() {

  return (
    <div className="Navbar">
      <ul>
        <div className='right'>
            <li><NavLink to="/sign_in" className={(navData) => navData.isActive ? "selected" : "" }>Sign In</NavLink></li>
            <li><NavLink to="/sign_up" className={(navData) => navData.isActive ? "selected" : "" }>Sign Up</NavLink></li>
        </div>
      </ul>
    </div>
  );
}

export default NotAuthNavbar;
