import React, {useState, useEffect} from "react";
import './Profile.css';
import FeedItem from "../../components/FeedItem";
import { allPosts } from '../../api/axios.js';
import {useAuth} from '../../context/AuthContext'

export default function FeedPage(){
    const { auth } = useAuth();

    const [posts, setPosts] = useState([{}]);

     useEffect(() => {
        getPosts();
      }, []);

    async function getPosts(){
        const token = auth.token;
        await allPosts(token).then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
        })
    }

    return(
        <div> 
            <div className="feed">
                {posts.map(post => (
                <FeedItem key={post.id} post={post} />
            ))}
            </div>
        </div>
    );
}