import axios from 'axios';

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth';
const PROFILE_URL = '/api/user/profile';
const USER_POSTS_URL = '/api/v1/Posts/ownposts';
const ALL_POSTS_URL = '/api/v1/Posts';
const PUT_PROFILE_URL = '/api/user/profile';
const LOGOUT_URL = '/api/auth/sign-out';

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
    )
}

export const signUp = async (newUser) => {
    const response = await axios.post(REGISTER_URL,
        JSON.stringify(newUser),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
}

export const userProfile = async (token) => {
    await axios.get(PROFILE_URL,
        {
            headers: { 'Authorization': `Bearer ${token}`,
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
        }
    )
}

export const userPosts = async (token) => {
    await axios.get(USER_POSTS_URL,
        {
            headers: { 'Authorization': `Bearer ${token}`,
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
        }
    )
}

export const allPosts = async (token) => {
    await axios.get(ALL_POSTS_URL,
        {
            headers: { 'Authorization': `Bearer ${token}`,
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
        }
    )
}

export const updateUser = async (updatedUser, token) => {
    await axios.put(PUT_PROFILE_URL, JSON.stringify(updatedUser),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': ['application/json', 'multipart/form-data']  },
                withCredentials: true
            }
        )
}

export const signOut = async (token) => {
    const response = await axios.post(LOGOUT_URL, "",        
          {
            headers: { 'Authorization': `Bearer ${token}`,
              "access-control-allow-origin" : "*",
          'Content-Type': 'application/json'  },
            withCredentials: true
          }
      )
}

export default axios.create({
    baseURL: 'https://localhost:7273'
});