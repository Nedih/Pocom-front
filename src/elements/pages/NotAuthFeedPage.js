import React, {useState, useEffect} from "react";
import './Profile.css';
import { allPostsAnonymous } from '../../api/axios.js';
import FeedItem from "../../components/FeedItem";

export default function NotAuthFeedPage(){

    const [posts, setPosts] = useState([{}]);

     useEffect(() => {
        const controller = new AbortController();
        getPosts(controller.signal);

        return () => {
            console.log("ABORT!!!")
            controller.abort();
        };
      }, []);

    async function getPosts(signal){
        await allPostsAnonymous(signal).then((response) => {
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