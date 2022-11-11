import React, { Component } from 'react';

export class FeedItem extends Component {

    render() {
        const { post } = this.props;

        return (
            <div key={post.id} className="alert alert-primary">
                <h4 className="alert-heading">{post.title}</h4>
                <p>{post.body}</p>
            </div>
        )
    }
}

export default FeedItem