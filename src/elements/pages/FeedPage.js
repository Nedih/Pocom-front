import React, {useState, useEffect} from "react";
import './Profile.css';
import FeedItem from "../../components/FeedItem";
import { allPosts } from '../../api/axios.js';
import {useAuth} from '../../context/AuthContext'
import PostCreate from "../PostCreate";

export default function FeedPage(){
    const { auth } = useAuth();

    const [posts, setPosts] = useState([{}]);

     useEffect(() => {
        getPosts();
      }, []);

    async function getPosts(){
        const token = auth.token;
        await allPosts().then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
        })
    }

    return(
        <div> 
            <div className="container">
                <PostCreate />
                {posts.filter((elem)=>elem.id).map(post => (
                <FeedItem key={post.id} post={post} />
            ))}
            </div>
        </div>
    );
}