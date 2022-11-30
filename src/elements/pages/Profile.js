import React, { useState, useEffect } from "react";
import './Profile.css';
import { userPosts, userPostsByLogin, userProfile } from '../../api/axios.js';
import ProfileInfo from "../ProfileInfo";
import EditProfileInfo from "../EditProfileInfo";
import { useAuth } from '../../context/AuthContext'
import PostCreate from "../PostCreate";
import FeedItem from "../../components/FeedItem";
import { useParams } from "react-router-dom";

export default function Profile(props) {
    const { auth } = useAuth();
    const { login } = useParams(); 

    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        const controller = new AbortController();

        getUserProfile(login, controller.signal);
           // .then(() =>{
                console.log(user.login + " + " + login);
                if(user.login == login || login == "")
                    getOwnPosts(controller.signal);
                else getUserPosts(login, controller.signal);
            //});

        
        return () => {
            console.log("ABORT!!!")
            controller.abort();
        };
    }, []);

    async function getUserProfile(log, signal) {
        await userProfile(log, signal).then((response) => {
            setUser(response.data);
        })
    }

    async function getOwnPosts(signal) {
        await userPosts(signal).then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
        })
    }

    async function getUserPosts(log, signal) {
        await userPostsByLogin(log, signal).then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
        })
    }

    function updateUser(updatedUser) {
        setUser(updatedUser);
    }

    function updateMode(mode) {
        setEditMode(mode);
    }

    return (
        <div>
            {editMode ?
                (
                    <EditProfileInfo user={user} updateUser={updateUser} updateMode={updateMode} />
                ) : (
                    <>
                        <ProfileInfo user={user} updateUser={updateUser} updateMode={updateMode} />
                        <div className="container">
                            <PostCreate />
                            {posts.map(post => (
                                <FeedItem key={post.id} post={post} />
                            ))}
                        </div>
                    </>

                )}
        </div>
    );
}