import { createContext, useContext, useEffect, useState } from 'react';
//import axios from 'axios';
import axios from '../api/axios.js';

const LOGIN_URL = '/auth';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  authUser: null,
  setAuthUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [authUser, setAuthUser] = useState(null);

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
    <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;