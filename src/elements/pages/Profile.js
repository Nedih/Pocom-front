import React, {useState, useEffect} from "react";
import './Profile.css';
import Feed from "../../components/Feed";
import axios from '../../api/axios.js';
import ProfileInfo from "../ProfileInfo";
import EditProfileInfo from "../EditProfileInfo";
import {useAuth} from '../../context/AuthContext'

const PROFILE_URL = '/api/user/profile';

export default function Profile(){
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
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

    function updateUser(updatedUser){
        setUser(updatedUser);
    }

    function updateMode(mode){
        setEditMode(mode);
    }

    return(
        <div> 
            {editMode ?           
            (
                <EditProfileInfo user={user} updateUser={updateUser} updateMode={updateMode}/> 
            ) : (
                <ProfileInfo user={user} updateUser={updateUser} updateMode={updateMode}/>
            ) }
            <div className="feed">
                <Feed />
            </div>
        </div>
    );
}