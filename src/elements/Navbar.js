import './Navbar.css';
import React from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import {useAuth} from '../AuthContext.js'

function Navbar() {
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();

  const logout = async () => {
    setAuth(false);
    navigate('/sign_in');
  }

  return (
    <div className="Navbar">
      <ul>
        <li><NavLink to="/feed" className={(navData) => navData.isActive ? "selected" : "" }>Feed</NavLink></li>
        <div className='right'>
          <li><NavLink to="/profile" className={(navData) => navData.isActive ? "selected" : "" }>Profile</NavLink></li>
          <li><a onClick={logout}>Log out</a></li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
