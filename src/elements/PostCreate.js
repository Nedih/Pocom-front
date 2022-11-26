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
        <div className="container">
            <h>Create Post</h>
            <div className='feed_item' style={{ 'textAlign': 'left' }} /*onClick={}*/>
                <div className='w-100 mt-30'> 
                    <div className='post_panel'>
                        <div className='user_label'>author</div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <p >Text</p>
                        <textarea className="form-control" placeholder="Text..." onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}