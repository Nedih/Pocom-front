import React, { useState } from "react";
import { postPost } from "../api/axios";
import {useAuth} from '../context/AuthContext'
import '../components/FeedItem.css';

export default function PostCreate(){
    const { auth } = useAuth();
    const [text, setText] = useState("");
    //const [text, setText] = useState("");

    async function handleSubmit(){
        const post = {
            text: text
        }

        await postPost(post)
        .then(() => {
            window.location.reload();
        })
    } 

    return(
        <div>
            {/* <h style={{'color':'white'}}>Create Post</h> */}
            <div className='feed_item' style={{ 'textAlign': 'left','paddingBottom':"16px",'minHeight':'90px' }} /*onClick={}*/>
                <div className='w-100 mt-30'> 
                    <div>
                        <textarea className="form-control dark" placeholder="Create Post" onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>Publish</button>
                </div>
            </div>
        </div>
    )
}