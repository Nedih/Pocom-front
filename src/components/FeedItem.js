import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './FeedItem.css';

export class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        clicked: false,
    };

    handleClick(event) {
        const { post } = this.props;
        window.location.replace(`/post/${post.id}`);
    }

    render() {
        const { post } = this.props;
        let { clicked } = this.state;
        let image;
        if (post.authorImage !== undefined) {
            image = <img className='user_image' alt="img" src={post.authorImage} />
        }
        else {
            image = <img className='user_image' alt="img" src='https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png' />
        }
        return (
            <>
                <div key={post.id} className='feed_item' style={{ 'textAlign': 'left' }} onClick={(e) => this.handleClick(e)}>
                    {image}
                    <div className='w-100'>
                        <div className='post_panel'>
                            <div className='user_label'>{post.author}</div>
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
                        <div className='post_btns'>
                            <span >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                1991
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-dots" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                1991
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FeedItem