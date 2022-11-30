import React, { Component } from 'react';
import Reactions from '../elements/partials/Reactions.js';
import ParentPost from '../elements/partials/ParentPost.js';
import Moment from 'moment';
import './FeedItem.css';

export class FeedItem extends Component {
    constructor(props) {
        super(props)
    }

    handleClick(event) {
        const { post } = this.props;
        window.location.assign(`/post/${post.id}`);
    }

    render() {
        const { post } = this.props;
        let className = "user_image";
        /*if(post.parentPostId != undefined)
            className += " with_parent"*/
        let image;
        if (post.authorImage !== undefined) {
            image = <img className={className} alt="img" src={post.authorImage} />
        }
        else {
            image = <img className={className} alt="img" src='https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png' />
        }
        return (
            <>
                <div key={post.id} className='feed_item' style={{ 'textAlign': 'left' }} onClick={(e) => this.handleClick(e)}>
                    <div className='post_content'> 
                        {image}
                        <div className='w-100'>
                            <div className='post_panel'>
                                {/*<div className='row row-cols-1'>
                                    <div className='col'>
                                        {post.parentPostId != undefined && <ParentPost id={post.parentPostId} />}
                                    </div>
        <div className='col'>*/}
                                        <div className='d-flex flex-row'>
                                            <div className='user_label'>{post.authorName}</div>
                                            <div className='px-1'>@{post.authorLogin}</div>
                                            <div className='px-1'>·</div>
                                            <div className='px-1 mt-0 postDate justify-content-center align-self-center' >{Moment(post.creationDate).format("MMM DD ' YY")}</div>
                                        </div>
                                    {/*</div>
                                </div>*/}
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
                                {post.parentPostId != undefined && <ParentPost id={post.parentPostId} />}
                            </div>

                            <Reactions post={post} /> 
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FeedItem