import React from "react";
import {
  Routes,
  Route
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
import AuthRoutes from "../elements/utils/AuthRoutes.js";
import AdminRoutes from "../elements/utils/AdminRoutes.js";

export default function AppRoutes() {
  return (
    <Routes>   
      <Route element={<AuthRoutes />}>

        <Route element={<AdminRoutes />}>
          <Route path="/admin-panel" element={<AdminPage/>} exact/>
        </Route>

        <Route path="/profile/:login" element={<Profile/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/feed" element={<FeedPage />} exact/>
        <Route path="/users" element={<UserListPage/>} exact/>
        <Route path="/reactions" element={<UserReactionsPage/>} exact/>

      </Route>

      <Route path="/sign_up" element={<SignUpForm/>} exact/>
      <Route path="/sign_in" element={<SignInForm/>} exact/>
      <Route path="/post/:postId" element={<Post/>} />
      <Route path="/" element={<NotAuthFeedPage />}  exact/>

    </Routes>
  );
}