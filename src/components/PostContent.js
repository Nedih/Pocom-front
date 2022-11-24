import React, { Component } from 'react';
import FeedItem from './FeedItem';
import './PostContent.css'
import axios from '../../src/api/axios.js';

const POST_URL = '/api/v1/Posts/';


export class PostContent extends Component {
    state = {
        post: {}
    };
    componentDidMount() {
        const { id } = this.props;
        axios.get(POST_URL+id,
            {
                headers: { 
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            this.setState({post:response.data});
        })

    }
    render() {
        const { post } = this.state;
        let image;
        if (post.image !== null) {
            image = <img className='attach mt-3' alt='img' src={post.image} />
        }
        else{
            image = <></>
        }

        return (
            <div className='container mt-5'>
                <div className='post'>
                    <div>
                        <div className='header'>
                            <img className='avatar' alt='img' src={post.authorImage} />
                            <div className='post_panel inner'>
                                <p className='user_label'>{post.authorUsername}</p>
                                <span className='options'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className='content'>
                        <div className='text'>{post?.text}</div>
                        
                        {image}
                        <div className='sub_data'>
                            <div className='mt-3 postDate' >{post.creationDate}</div>
                            <div className='post_btns'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                1991
                            </span>
                        </div>

                        </div>
                    </div>
                </div>
                <div className='comments_block'>
                    <div>
                        <h3>Leave a comment</h3>
                        <textarea className='form-control'></textarea>
                        <button className='btn btn-primary w-100 mt-2'>Comment</button>
                    </div>
                    <div className='comments'>
                        <FeedItem post={post}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostContent