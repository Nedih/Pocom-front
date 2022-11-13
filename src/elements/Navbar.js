import './Navbar.css';
import React from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import i18n from './i18n';
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
        <li><NavLink to="/feed" className={(navData) => navData.isActive ? "selected" : "" }>{i18n.t('Feed')}</NavLink></li>
        <div className='right'>
          <li><NavLink to="/profile" className={(navData) => navData.isActive ? "selected" : "" }>{i18n.t('Profile')}</NavLink></li>
          <li><a onClick={logout}>{i18n.t('Log out')}</a></li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
