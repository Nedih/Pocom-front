import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        clicked: false,
    };

    handleClick() {
        console.log(this.clicked);
        this.setState({ clicked: true });
        console.log(this.clicked);
    }

    render() {
        const { post } = this.props;
        let { clicked } = this.state;

        return (
            <>
                {clicked && (
                    <Navigate to={`/post/${post.id}`} replace={true} />
                )}

                <div key={post.id} className="alert alert-primary" onClick={this.handleClick}>
                    <h4 className="alert-heading">{post.title}</h4>
                    <p>{post.body}</p>
                </div>
            </>
        )
    }
}

export default FeedItem