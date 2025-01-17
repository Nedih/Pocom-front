import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpForm from '../elements/pages/SignUpForm.js'
import SignInForm from '../elements/pages/SignInForm.js'
import Feed from '../components/Feed.js'
import Profile from '../elements/pages/Profile.js'
import Post from '../elements/pages/Post.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpForm/>} />
      <Route path="/sign_in" element={<SignInForm/>} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/post/:postId" element={<Post/>} />
      {/*<Route path="/" element={<div></div>} />*/}
    </Routes>
  );
}