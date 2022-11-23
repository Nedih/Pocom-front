import React, { Component } from 'react';
import data from './data/posts.json'
import FeedItem from './FeedItem';
import './PostContent.css'

export class PostContent extends Component {
    state = {
        post: {}
    };
    componentDidMount() {
        const { id } = this.props;
        const getData = async () => {
            this.setState({
                post: data.filter((elem) => {
                    return elem.id == id
                })[0]
            });
        };
        getData();
    }
    render() {
        const { post } = this.state;
        let image;
        if (post.img !== undefined) {
            image = <img class='attach mt-3' alt='img' src={post.img} />
        }
        else{
            image = <></>
        }

        return (
            <div className='container mt-5'>
                <div class='post'>
                    <div>
                        <div class='header'>
                            <img class='avatar' alt='img' src={post.img} />
                            <div className='post_panel inner'>
                                <h4 className='user_label'>Username</h4>
                                <span className='options'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class='content'>
                        <div class='text'>{post?.body}</div>
                        
                        {image}
                        <div className='sub_data'>
                            <div class='mt-3' className="postDate">{post.date}</div>
                            <div className='post_btns'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
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