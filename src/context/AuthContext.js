import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  auth: {
    loggedIn: false,
    token: ""
  },
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: JSON.parse(window.sessionStorage.getItem('isAuthorized')),
    token: window.sessionStorage.getItem('userToken')?.toString(),
    refreshToken: window.sessionStorage.getItem('refreshToken')?.toString()
  }); 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;