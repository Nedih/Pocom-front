import './Navbar.css';
import React, {useContext} from "react";
import {
  NavLink,
  useNavigate
} from "react-router-dom";
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';
import {useAuth} from '../context/AuthContext'

const LOGOUT_URL = '/api/auth/sign-out';
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
      const response = await axios.post(LOGOUT_URL, "",        
          {
            headers: { 'Authorization': `Bearer ${token}`,
              "access-control-allow-origin" : "*",
          'Content-Type': 'application/json'  },
            withCredentials: true
          }
      ).then((response) => {
        console.log(JSON.stringify(response?.data));
        setAuth({ loggedIn: false, token: ""});
        window.sessionStorage.setItem('userToken', "")
        window.sessionStorage.setItem('isAuthorized', false);
        
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
