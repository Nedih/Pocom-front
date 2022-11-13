import './Navbar.css';
import React from "react";
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import {
  NavLink
} from "react-router-dom";

const lngs = {
  en: { nativeName: 'English' },
  ua: { nativeName: 'Ukrainian' }
};

function NotAuthNavbar() {
  const { i18n } = useTranslation();

  return (
    <div className="Navbar">
      <ul>
        <li><div className='lang'>
          {Object.keys(lngs).map((lng) => (
            <a key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </a>
          ))}
        </div></li>
        <div className='right'>
            <li><NavLink to="/sign_in" className={(navData) => navData.isActive ? "selected" : "" }>{i18n.t('Sign In')}</NavLink></li>
            <li><NavLink to="/sign_up" className={(navData) => navData.isActive ? "selected" : "" }>{i18n.t('Sign Up')}</NavLink></li>
        </div>
      </ul>
    </div>
  );
}

export default NotAuthNavbar;
