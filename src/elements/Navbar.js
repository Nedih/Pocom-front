import './Navbar.css';
import React from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import { signOut } from '../api/axios';
import {useAuth} from '../context/AuthContext'
import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  ua: { nativeName: 'Ukrainian' }
};

function Navbar() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth, auth} = useAuth();

  const logout = async () => {
    try {
      const token = auth.token;
      console.log("Send this:" + token);
      signOut(token).then((response) => {
        console.log(JSON.stringify(response?.data));
        setAuth({ loggedIn: false, token: "", refreshToken: "", roles: []});
        window.sessionStorage.setItem('userToken', "")
        window.sessionStorage.setItem('isAuthorized', false);
        window.sessionStorage.setItem('refreshToken', "");
        window.sessionStorage.setItem('userRoles', []);

        navigate('/sign_in');
      });
    }
    catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 400) {
        console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Login Failed');
      }
  }
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
        <li>
          {auth.roles.find(el => el === "Admin")? 
          (
            <li><NavLink to="/admin-panel" className={(navData) => navData.isActive ? "selected" : "" }>{i18n.t('Admin Panel')}</NavLink></li>
          ) : (
            <></>
          )}
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
