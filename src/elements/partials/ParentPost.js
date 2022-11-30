import React, {useState, useEffect} from "react";
import Moment from 'moment';
import { getPost } from "../../api/axios";
import Reactions from "./Reactions";

export default function ParentPost(props){
    const [image, setImage] = useState(true);
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(props.id)
            .then((response) => {
                setPost(response?.data);
            }
        );
    }, [])

    const handleClick = (e) => {
        e.stopPropagation();
        window.location.assign(`/post/${post.id}`)
    }

    return(
        <>
             <div key={post.id} className='parent_post' style={{ 'textAlign': 'left' }} onClick={(e) => handleClick(e)}>
                    <div className='post_content'> 
                        {post.authorImage !== undefined? 
                        (
                            <img className='user_image parent' alt="img" src={post.authorImage} />
                        ) : (
                            <img className='user_image parent' alt="img" src='https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png' />
                        )}
                        <div className='w-100'>
                            <div className='post_panel'>
                                <div className='d-flex flex-row'>
                                    <div className='user_label'>{post.authorName}</div>
                                    <div className='px-1'>@{post.authorLogin}</div>
                                    <div className='px-1'>·</div>
                                    <div className='px-1 mt-0 postDate justify-content-center align-self-center' >{Moment(post.creationDate).format("MMM DD ' YY")}</div>
                                </div>
                                <div className="dropdown"  onClick={(e) => e.stopPropagation()}>
                                    <span data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                        </svg>
                                    </span>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>

                                </div>
                            </div>

                            <div>
                                <p >{post.text}</p>
                            </div>

                            <Reactions post={post} /> 
                        </div>
                    </div>
                </div>
            </>
    );
}