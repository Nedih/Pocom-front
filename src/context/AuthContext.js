import React, { createContext, useContext, useEffect, useState } from 'react';
import { addHeaderAuth } from '../../src/api/axios.js';

const AuthContext = createContext({
  auth: {
    loggedIn: false,
    token: "",
    refreshToken: "",
    roles: []
  },
  setAuth: () => { },
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: JSON.parse(window.sessionStorage.getItem('isAuthorized')),
    token: window.sessionStorage.getItem('userToken')?.toString(),
    refreshToken: window.sessionStorage.getItem('refreshToken')?.toString(),
    roles: JSON.parse(window.sessionStorage.getItem('userRoles')),
  });
  addHeaderAuth(auth.token);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;