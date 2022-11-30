import React from "react";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth';
const PROFILE_URL = '/api/user/profile';
const USER_OWN_POSTS_URL = '/api/v1/Posts/ownposts';
const POST_COMMENTS_URL = '/api/v1/Posts/comments/';
const ALL_POSTS_URL = '/api/v1/Posts';
const PUT_PROFILE_URL = '/api/user/profile';
const LOGOUT_URL = '/api/auth/sign-out';
const USERS_URL = '/api/user/users-list';
const ALL_POSTS_ANONYMOUS_URL = '/api/v1/Posts/';
const USER_REACTIONS_URL = '/api/v1/Posts/user-reactions';
const REACTIONS_URL = '/api/reactions/';
const POST_URL = '/api/v1/Posts/';
const USER_POSTS_URL = '/api/v1/Posts/profile/';

const PUT_EMAIL_URL = '/api/user/email';
const PUT_PASSWORD_URL = '/api/user/password';

const TOKEN_REFRESH_URL = '/api/auth/refresh-token';

const axiosBase = axios.create({
    baseURL: 'https://localhost:7273'
});

export const signIn = async (input) => {
    return await axiosBase.post(LOGIN_URL,
        JSON.stringify(input),
        {
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            withCredentials: true
        }
    );
}

export const addHeaderAuth = async (token) => {
    axiosBase.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const signUp = async (newUser) => {
    return await axiosBase.post(REGISTER_URL,
        JSON.stringify(newUser),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
}

export const userProfile = async (login, signal) => {
    console.log(login);
    let URL = PROFILE_URL;
    if (login != undefined)
        URL += "/" + login;
    try{
        return await axiosBase.get(URL,
            {
                data: login,
                headers: { 
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                signal: signal,
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const userPosts = async (signal) => {
    try{
        return await axiosBase.get(USER_OWN_POSTS_URL,
            {
                headers: { 
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                signal: signal,
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const userPostsByLogin = async (login, signal) => {
    try{
        return await axiosBase.get(USER_POSTS_URL +login,
            {
                data: login,
                headers: { 
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                signal: signal,
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const allPosts = async (signal) => {
    try{
        return await axiosBase.get(ALL_POSTS_URL,
        {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            signal: signal,
            withCredentials: true
        }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const updateUser = async (updatedUser) => {
    try{
        return await axiosBase.put(PUT_PROFILE_URL, JSON.stringify(updatedUser),
            {
                headers: { 
                    "access-control-allow-origin" : "*",
                    'Content-Type': ['application/json', 'multipart/form-data']  },
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const updateUserEmail = async (updatedEmail) => {
    try {
        return await axiosBase.put(PUT_EMAIL_URL, updatedEmail,             
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const updateUserPassword = async (updatedPassword) => {
    try {
        return await axiosBase.put(PUT_PASSWORD_URL, updatedPassword,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const signOut = async () => {
    try{
        return await axiosBase.post(LOGOUT_URL, "",        
          {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
          }
      )} catch(err) {  
        catchRefresh(err);
    };
}

export const getUsers = async (signal) => {
    try{
        return await axiosBase.get(USERS_URL,
        {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            signal: signal,
            withCredentials: true
        }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const allPostsAnonymous = async (signal) => {
    return await axiosBase.get(ALL_POSTS_ANONYMOUS_URL,
        {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            signal: signal,
            withCredentials: true
        }
    )
}

export const userReactions = async (signal) => {
    try{
        return await axiosBase.get(USER_REACTIONS_URL,
        {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            signal: signal,
            withCredentials: true
        }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const getPost = async (id, signal) => {
    try{
        return await axiosBase.get(POST_URL + id,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                signal: signal,
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}


export const postPost = async (post) => {
    try {
        return await axiosBase.post(ALL_POSTS_URL, post,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const getComments = async (id) => {
    try {
        return await axiosBase.get(POST_COMMENTS_URL+id,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const makeReaction = async (reaction) => {
    try {
        return await axiosBase.post(REACTIONS_URL, reaction,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const changeReaction = async (reaction) => {
    try {
        return await axiosBase.put(REACTIONS_URL, reaction,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export const deleteReaction = async (reaction) => {
    try {
        return await axiosBase.delete(REACTIONS_URL,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                data: reaction,
                withCredentials: true
            }
        )
    } catch (err) {
        catchRefresh(err);
    };
}

export async function setTokens(response){
   // const {auth, setAuth} = useAuth();

    console.log(JSON.stringify(response?.data));
    const accessToken = response?.data?.accessToken;
    const refreshToken = response?.data?.refreshToken;
    console.log("TOKEN: " + accessToken);
    console.log("TOKEN2: " + refreshToken);

    window.sessionStorage.setItem('userToken', accessToken?.toString());
    window.sessionStorage.setItem('refreshToken', refreshToken?.toString());
    window.sessionStorage.setItem('isAuthorized', true);

    console.log("I set token to --- " + window.sessionStorage.getItem('userToken')?.toString());
    console.log("I set refreshToken to --- " + window.sessionStorage.getItem('refreshToken')?.toString());
    await addHeaderAuth(accessToken);
    /*const loggedUser = { loggedIn: true, token: accessToken?.toString(), refreshToken: refreshToken?.toString(), roles: auth.roles}
    setAuth(loggedUser);*/
}

export const refreshTokens = async() => {
    try{
        const token = window.sessionStorage.getItem('userToken')?.toString();
        const refresh = window.sessionStorage.getItem('refreshToken')?.toString();
        const tokens = {
            accessToken: token,
            refreshToken: refresh
        };
        await axiosBase.post(TOKEN_REFRESH_URL, tokens,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(async (response) => {
            console.log(JSON.stringify(response?.data));
            await setTokens(response);
            window.location.reload();
        })
    } catch (err) {
        console.log(`Status: ${err.response?.status}\nMessage: ${err.response?.message}\nText: ${err.response?.text}`)
    }
}

async function catchRefresh(err) {
    console.log(err.message);
    if (err.message == "Network Error") {
        await refreshTokens();
    }
}

export default axios.create({
    baseURL: 'https://localhost:7273'
});