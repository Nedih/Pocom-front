import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpForm from './SignUpForm.js'
import Feed from '../components/Feed.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpForm/>} />
      <Route path="/feed" element={<Feed />} />
      {/*<Route path="/" element={<div></div>} />*/}
    </Routes>
  );
}
  

function Profile() {
  return <h2>Profile</h2>;
}