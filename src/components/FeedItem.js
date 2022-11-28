import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios, { changeReaction, deleteReaction, makeReaction } from '../../src/api/axios.js';
import './FeedItem.css';

export class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.likeHandler = this.likeHandler.bind(this);
    }

    state = {
        clicked: false,
    };

    componentDidMount() {
    }

    handleClick() {
        console.log(this.clicked);
        this.setState({ clicked: true });
        console.log(this.clicked);
    }

    async likeHandler(event) {
        event.stopPropagation();
        const { post } = this.props;
        const reaction = {
            postId: post.id,
            reactionType: 1
        }
        switch(post.userReactionType) {
            case 1:
                await deleteReaction(reaction);
                break;
            case 2:
                await changeReaction(reaction);
                break;
            case 3:
                await changeReaction(reaction);
                break;
            default:
                await makeReaction(reaction);
                break;
          }

        console.log("Hello");
        //window.location.reload();
    }

    render() {
        const { post } = this.props;
        let { clicked } = this.state;
        let image;
        if (post.authorImage !== undefined) {
            image = <img className='user_image' alt="img" src={post.authorImage} />
        }
        else{
            image = <img className='user_image' alt="img" src='https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png' />
        }
        return (
            <>
                {clicked && (
                    <Navigate to={`/post/${post.id}`} replace={true} />
                )}
                <div key={post.id} className='feed_item' style={{ 'textAlign': 'left' }} onClick={this.handleClick}>
                    {image}
                    <div className='w-100'>
                        <div className='post_panel'>
                            <div className='user_label'>{post.authorUsername}</div>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                            </span>
                        </div>

                        <div>
                            <p >{post.text}</p>
                        </div>
                        <div className='post_btns'>
                            <span onClick={(e) => this.likeHandler(e)}>
                                {post.userReactionType == 1? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                )}
                                {post?.reactionStats && post?.reactionStats["Like"]}
                            </span>
                            <span>
                                {post.userReactionType == 2? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire" color='orange' viewBox="0 0 16 16">
                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                                    </svg>
                                )}
                                {post?.reactionStats && post?.reactionStats["Fire"]}
                            </span>
                            <span>
                                {post.userReactionType == 3? 
                                (
                                    <i class="bi bi-hand-thumbs-down-fill"></i>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                    </svg>
                                )}
                                {post?.reactionStats && post?.reactionStats["Dislike"]}
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
                {/* <div key={post.id} className="alert alert-primary" onClick={this.handleClick}>
                    <h4 className="alert-heading">{post.title}</h4>
                    <p>{post.body}</p>
                </div> */}
            </>
        )
    }
}

export default FeedItem