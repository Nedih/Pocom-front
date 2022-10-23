import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import Navbar from './elements/Navbar.js'
import AppRoutes from './elements/AppRoutes.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
