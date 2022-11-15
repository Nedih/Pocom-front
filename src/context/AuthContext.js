import React, { createContext, useContext, useEffect, useState } from 'react';
//import axios from 'axios';
import axios from '../api/axios.js';

const LOGIN_URL = '/auth';

const AuthContext = createContext({
  auth: {
    loggedIn: false,
    token: ""
  },//JSON.parse(window.sessionStorage.getItem('isAuthorized')),
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: JSON.parse(window.sessionStorage.getItem('isAuthorized')),
    token: window.sessionStorage.getItem('userToken')?.toString()
  }); //JSON.parse(window.sessionStorage.getItem('isAuthorized'))
  //const [authUser, setAuthUser] = useState(window.sessionStorage.getItem('userToken'));

  /*useEffect(() => {
    const isAuth = async () => {
      try {
        const res = await axios.get(
          '/api/logged-user/',
          { withCredentials: true }
        );
      
        setAuthUser(res.data);
      } catch(error) {
        setAuthUser(null);
      };
    };

    isAuth();
  }, [auth]);*/

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;