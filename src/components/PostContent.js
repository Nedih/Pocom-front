import React, { Component } from 'react';
import FeedItem from './FeedItem';
import './PostContent.css'
import axios from '../../src/api/axios.js';
import { postPost, getComments } from "../api/axios";

const POST_URL = '/api/v1/Posts/';


export class PostContent extends Component {
    state = {
        post: {},
        comments: [],
        loaded: false,
        text: ''
    };

    componentDidMount() {
        const { id } = this.props;

        axios.get(POST_URL + id,
            {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then((response) => {
            this.setState({ post: response.data });
            this.setState({ loaded: true });
        })
        getComments(id)
            .then((response) => {
                this.setState({ comments: response.data });
            })
    }
    render() {
        const { text, post, loaded, comments } = this.state;

        async function handleSubmit() {

            const comment = {
                text: text,
                parentPostId: post.id
            }

            await postPost(comment)
                .then(() => {
                    window.location.reload();
                })
        }

        let image;
        if (post.image !== null) {
            image = <img className='attach mt-3' alt='img' src={post.image} />
        }
        else {
            image = <></>
        }

        return (
            <div>
                {loaded ?
                    (
                        <div className='container mt-2'>
                            <div className='post'>
                                <div>
                                    <div className='header'>
                                        <img className='avatar' alt='img' src={post.authorImage} />
                                        <div className='post_panel inner'>
                                            <p className='user_label'>{post.author}</p>
                                            <div className="dropdown">
                                                <span className='options' data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
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
                                    <textarea className='form-control' onChange={(e) => this.setState({ text: e.target.value })}></textarea>
                                    <button className='btn btn-primary w-100 mt-2 ' onClick={handleSubmit}>Comment</button>
                                </div>
                                {comments.length>0 ? 
                                (
                                <div className='comments'>
                                    {comments.map(comment => (
                                        <FeedItem key={comment.id} post={comment} />
                                    ))}
                                </div>
                                ) : (
                                    <div className='w-100 mt-2 empty-container' >
                                        <label>Empty</label>
                                    </div>
                                    )
                                }
                                
                            </div>
                        </div>
                    ) : (
                        <div className='container'>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ 'width': '100%' }}></div>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default PostContent