import React, { useState, useEffect } from "react";
import './Profile.css';
import { userPosts, userProfile } from '../../api/axios.js';
import ProfileInfo from "../ProfileInfo";
import EditProfileInfo from "../EditProfileInfo";
import { useAuth } from '../../context/AuthContext'
import FeedPage from "./FeedPage";
import PostCreate from "../PostCreate";
import FeedItem from "../../components/FeedItem";

export default function Profile() {
    const { auth } = useAuth();

    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        const controller = new AbortController();

        getUserProfile(controller.signal);
        getUserPosts(controller.signal);

        return () => {
            console.log("ABORT!!!")
            controller.abort();
        };
    }, []);

    async function getUserProfile(signal) {
        await userProfile(signal).then((response) => {
            setUser(response.data);
        })
    }

    async function getUserPosts(signal) {
        await userPosts(signal).then((response) => {
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
                        <div>
                            <PostCreate />
                        </div>
                        <div className="feed">
                            {posts.map(post => (
                                <FeedItem key={post.id} post={post} />
                            ))}
                        </div>
                    </>

                )}
        </div>
    );
}