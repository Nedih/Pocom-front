import './Navbar.css';
import React from "react";
import i18n from './i18n';
import {
  NavLink
} from "react-router-dom";

function NotAuthNavbar() {

  return (
    <div className="Navbar">
      <ul>
        <li><div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
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
