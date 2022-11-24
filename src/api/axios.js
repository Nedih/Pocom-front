import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth';
const PROFILE_URL = '/api/user/profile';
const USER_POSTS_URL = '/api/v1/Posts/ownposts';
const ALL_POSTS_URL = '/api/v1/Posts';
const PUT_PROFILE_URL = '/api/user/profile';
const LOGOUT_URL = '/api/auth/sign-out';

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

export const signUp = async (newUser) => {
    return await axiosBase.post(REGISTER_URL,
        JSON.stringify(newUser),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
}

export const userProfile = async (token) => {
    try{
        return await axiosBase.get(PROFILE_URL,
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const userPosts = async (token) => {
    try{
        return await axiosBase.get(USER_POSTS_URL,
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const allPosts = async (token) => {
    try{
        return await axiosBase.get(ALL_POSTS_URL,
        {
            headers: { 'Authorization': `Bearer ${token}`,
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
        }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const updateUser = async (updatedUser, token) => {
    try{
        return await axiosBase.put(PUT_PROFILE_URL, JSON.stringify(updatedUser),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': ['application/json', 'multipart/form-data']  },
                withCredentials: true
            }
    )} catch(err) {  
        catchRefresh(err);
    };
}

export const signOut = async (token) => {
    try{
        return await axiosBase.post(LOGOUT_URL, "",        
          {
            headers: { 'Authorization': `Bearer ${token}`,
              "access-control-allow-origin" : "*",
          'Content-Type': 'application/json'  },
            withCredentials: true
          }
      )} catch(err) {  
        catchRefresh(err);
    };
}

async function setTokens(response){
    //const {setAuth} = useAuth();
    const accessToken = response?.data?.accessToken;
    const refreshToken = response?.data?.refreshToken;
    console.log("TOKEN: " + accessToken);

    window.sessionStorage.setItem('userToken', accessToken?.toString());
    window.sessionStorage.setItem('refreshToken', refreshToken?.toString());
    window.sessionStorage.setItem('isAuthorized', true);
    
    //const loggedUser = { loggedIn: true, token: accessToken?.toString(), refreshToken: refreshToken?.toString()}
    //setAuth(loggedUser);
}

async function catchRefresh(err){
    console.log(err.message);
        if (err.message == "Network Error"){
            const token = window.sessionStorage.getItem('userToken')?.toString();
            const tokens = { 
                accessToken: token, 
                refreshToken: window.sessionStorage.getItem('refreshToken')?.toString()
            };
            await axiosBase.post(TOKEN_REFRESH_URL, tokens,
                {
                    headers: { 'Authorization': `Bearer ${token}`,
                        "access-control-allow-origin" : "*",
                        'Content-Type': 'application/json'  },
                    withCredentials: true
                } 
        ).then((response) => {
            setTokens(response);
        })}
}

export default axios.create({
    baseURL: 'https://localhost:7273'
});