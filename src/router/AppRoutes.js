import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUpForm from '../elements/pages/SignUpForm.js'
import SignInForm from '../elements/pages/SignInForm.js'
import Profile from '../elements/pages/Profile.js'
import Post from '../elements/pages/Post.js'
import FeedPage from "../elements/pages/FeedPage.js";
import AdminPage from "../elements/pages/admin/AdminPage.js";
import NotAuthFeedPage from "../elements/pages/NotAuthFeedPage.js";
import UserListPage from "../elements/pages/UserListPage.js";
import UserReactionsPage from "../elements/pages/UserReactionsPage.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpForm/>} />
      <Route path="/sign_in" element={<SignInForm/>} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/post/:postId" element={<Post/>} /> 
      <Route path="/admin-panel" element={<AdminPage/>} />
      <Route path="/users" element={<UserListPage/>} />
      <Route path="/reactions" element={<UserReactionsPage/>} />
      <Route path="/" element={<NotAuthFeedPage />} />
    </Routes>
  );
}