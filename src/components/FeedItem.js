import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios, { changeReaction, deleteReaction, makeReaction } from '../../src/api/axios.js';
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
                        <div className='post_btns'>
                            <span onClick={(e) => this.reactionHandler(e, 1)} hidden={post?.reactionStats && post?.reactionStats["Like"] > 0 ? false 
                                : (true && reactionsHidden)} onMouseEnter={() => this.handleHover(false)} onMouseLeave={() => this.handleHover(true)}>
                                {post.userReactionType == 1? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                )}
                                <span className='p1'>{post?.reactionStats && post?.reactionStats["Like"]}</span>
                            </span>
                            <span onClick={(e) => this.reactionHandler(e, 2)} hidden={post?.reactionStats && post?.reactionStats["Fire"] > 0 ? false 
                                : (true && reactionsHidden)} onMouseEnter={() => this.handleHover(false)} onMouseLeave={() => this.handleHover(true)}>
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
                                <span className='p1'>{post?.reactionStats && post?.reactionStats["Fire"]}</span>
                            </span>
                            <span onClick={(e) => this.reactionHandler(e, 3)} hidden={post?.reactionStats && post?.reactionStats["Dislike"] > 0 ? false 
                                : (true && reactionsHidden)} onMouseEnter={() => this.handleHover(false)} onMouseLeave={() => this.handleHover(true)}>
                                {post.userReactionType == 3? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                    </svg>
                                )}
                                <span className='p1'>{post?.reactionStats && post?.reactionStats["Dislike"]}</span>
                            </span>
                            <span hidden={post?.commentsCount > 0 ? false 
                                : (true && reactionsHidden)} onMouseEnter={() => this.handleHover(false)} onMouseLeave={() => this.handleHover(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-dots" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                <span className='p1'>{post?.commentsCount}</span>
                            </span>
                        </div>                         
                    </div>
                    <div onMouseEnter={() => this.handleHover(false)} onMouseLeave={() => this.handleHover(true)} className="btnHoverContainer"></div>
                </div>
            </>
        )
    }
}

export default FeedItem