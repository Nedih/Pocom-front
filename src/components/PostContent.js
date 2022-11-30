import React, { Component } from 'react';
import Moment from 'moment';
import FeedItem from './FeedItem';
import './PostContent.css'
import { postPost, getComments, getPost } from "../api/axios";
import Reactions from '../elements/partials/Reactions.js';


export class PostContent extends Component {
    state = {
        post: {},
        comments: [],
        loaded: false,
        text: ''
    };

    componentDidMount() {
        const { id } = this.props;

        getPost(id)
            .then((response) => {
                this.setState({ post: response.data });
                this.setState({ loaded: true });
            }
        );
        getComments(id)
            .then((response) => {
                this.setState({ comments: response.data });
            }
        );
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
            image = <img className='attach mt-3 rounded' alt='img' src={post.image} />
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
                                        <div className='d-flex flex-row'>
                                            <div className='user_label'>{post.authorName}</div>
                                            <div className='px-1'>@{post.authorLogin}</div>
                                        </div>
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
                                        <div className='mt-0 postDate justify-content-center align-self-center' >{Moment(post.creationDate).format("HH:MM · MMM DD, YYYY")}</div>
                                        <Reactions post={post} /> 
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