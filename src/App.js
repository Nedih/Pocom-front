import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import Navbar from './elements/Navbar.js'
import NotAuthNavbar from './elements/NotAuthNavbar.js'
import AppRoutes from './elements/AppRoutes.js'
import {useAuth} from './AuthContext.js'

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <Router>
        {auth ? <Navbar /> : <NotAuthNavbar />}
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
