import React, {useState, useEffect} from "react";
import './Profile.css';
import Feed from "../../components/Feed";
import { userPosts, userProfile } from '../../api/axios.js';
import ProfileInfo from "../ProfileInfo";
import EditProfileInfo from "../EditProfileInfo";
import {useAuth} from '../../context/AuthContext'

export default function Profile(){
    const { auth } = useAuth();

    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        getUserProfile();
        getUserPosts();
      }, []);

    async function getUserProfile(){
        const token = auth.token;
        await userProfile(token).then((response) => {
            setUser(response.data);
        })
    }

    async function getUserPosts(){
        const token = auth.token;
        await userPosts(token).then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
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
                <Feed posts={posts}/>
            </div>
        </div>
    );
}