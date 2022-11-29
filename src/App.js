import React, {useContext} from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import './styles/Bootstrap.css'
import Navbar from './elements/Navbar.js'
import NotAuthNavbar from './elements/NotAuthNavbar.js'
import AppRoutes from "./router/AppRoutes";
import {useAuth} from './context/AuthContext.js'

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <Router>
        {auth.loggedIn ? <Navbar /> : <NotAuthNavbar />}
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
