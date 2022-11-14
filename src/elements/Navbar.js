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

function Navbar() {
  const navigate = useNavigate();
  const { setAuth, authUser} = useAuth();

  const logout = async () => {
    try {
      const token = authUser.accessToken;
      console.log("Send this:" + token);
      const response = await axios.post(LOGOUT_URL, "",        
          {
            headers: { 'Authorization': `Bearer ${token}`,
              "access-control-allow-origin" : "*",
          'Content-Type': 'application/json'  },
            withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      setAuth(false);
      navigate('/sign_in');
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
