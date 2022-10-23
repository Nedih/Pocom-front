import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpForm from './SignUpForm.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpForm/>} />
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}
  
function Feed() {
  return <h2>Feed</h2>;
}

function Profile() {
  return <h2>Profile</h2>;
}

function SignUp() {
  return <h2>Sign Up</h2>;
}