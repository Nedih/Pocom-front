import { createContext, useContext, useEffect, useState } from 'react';
//import axios from 'axios';
import axios from './api/axios.js';

const LOGIN_URL = '/auth';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const res = await axios.get(
          '/api/logged-user/',
          { withCredentials: true }
        );
      
        setUser(res.data);
      } catch(error) {
        setUser(null);
      };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;