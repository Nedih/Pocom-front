import React, {useState, useEffect} from "react";
import './Profile.css';
import Feed from "../../components/Feed";
import axios from '../../api/axios.js';
import {useAuth} from '../../context/AuthContext'

const PROFILE_URL = '/api/user/profile';

export default function Profile(){
    const [user, setUser] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        getUserProfile();
      }, []);

    async function getUserProfile(){
        const token = auth.token;
        await axios.get(PROFILE_URL,
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            setUser(response.data);
        })
    }

    return(
        <div>
            <div className="profile">
                <div className="row">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" width="105px"/> 
                    <div className="btnContainer"><button className="editBtn">Edit Profile</button></div>
                </div>
                <div className="profileNames">
                    <p>Name: {user.name}</p>
                    <p>Username: {user.login}</p>
                </div>
                <br />

            </div>
            <div className="feed">
                <Feed />
            </div>
        </div>
    );
}