import React, { Component } from 'react';
import axios, { changeReaction, deleteReaction, makeReaction } from '../../src/api/axios.js';
import Reactions from '../elements/partials/Reactions.js';
import './FeedItem.css';

export class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.reactionHandler = this.reactionHandler.bind(this);
    }

    state = {
        clicked: false,
        reactionsHidden: true,
    };

    handleClick(event) {
        const { post } = this.props;
        window.location.assign(`/post/${post.id}`);
    }

    handleHover(bool) {
        //console.log(bool);
        this.setState({ reactionsHidden: bool });
    }

    async reactionHandler(event, type) {
        event.stopPropagation();
        const { post } = this.props;
        const reaction = {
            postId: post.id,
            reactionType: type
        }
        switch(post.userReactionType) {
            case type:
                await deleteReaction(reaction);
                break;
            case undefined:
                await makeReaction(reaction);
                break;
            case null:
                await makeReaction(reaction);
                break;
            default:
                await changeReaction(reaction);
                break;
          }

        console.log("Hello");
        window.location.reload();
    }

    render() {
        const { post } = this.props;
        let { clicked, reactionsHidden } = this.state;
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
                        
                        <Reactions post={post} />

                    </div>
                </div>
            </>
        )
    }
}

export default FeedItem