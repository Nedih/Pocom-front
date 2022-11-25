import React, {useState, useEffect} from "react";
import './Profile.css';
import Feed from "../../components/Feed";
import { allPostsAnonymous } from '../../api/axios.js';
import {useAuth} from '../../context/AuthContext'
import FeedItem from "../../components/FeedItem";

export default function NotAuthFeedPage(){
    const { auth } = useAuth();

    const [posts, setPosts] = useState([{}]);

     useEffect(() => {
        getPosts();
      }, []);

    async function getPosts(){
        await allPostsAnonymous().then((response) => {
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