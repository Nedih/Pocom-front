import './Navbar.css';
import React from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {useAuth} from '../AuthContext.js'

const lngs = {
  en: { nativeName: 'English' },
  ua: { nativeName: 'Ukrainian' }
};

function Navbar() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();

  const logout = async () => {
    setAuth(false);
    navigate('/sign_in');
  }

  return (
    <div className="Navbar">
      <ul>
        <li>
          <div className='lang'>
            {Object.keys(lngs).map((lng) => (
              <a key={lng} onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </a>
            ))}
          </div>
        </li>
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
