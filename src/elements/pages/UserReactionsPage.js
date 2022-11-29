import React, {useState, useEffect} from "react";
import { userReactions } from '../../api/axios.js';
import FeedItem from "../../components/FeedItem";

export default function UserReactionsPage(){
    const [reactions, setReactions] = useState([{}]);

    useEffect(() => {
        const controller = new AbortController();
        getUserReactions(controller.signal);

        return () => {
            console.log("ABORT!!!")
            controller.abort();
        };
    }, []);

    async function getUserReactions(signal){
        await userReactions(signal).then((response) => {
            console.log(JSON.stringify(response.data));
            setReactions(response.data);
        })
    }

    return(
        <div> 
            <div className="feed">
                {reactions.map(post => (
                    <FeedItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}