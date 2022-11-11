import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import Feed from '../components/Feed.js'
import Profile from './pages/Profile.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpForm/>} />
      <Route path="/sign_in" element={<SignInForm/>} />
      <Route path="/feed" element={<Feed />} />
      {/*<Route path="/" element={<div></div>} />*/}
    </Routes>
  );
}