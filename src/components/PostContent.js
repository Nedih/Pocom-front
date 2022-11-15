import React, { Component } from 'react';
import data from './data/posts.json'
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

        return (
            <div className='container mt-5'>
                <div class='post'>
                    {post?.body}
                </div>
                <div>
                    <img src={post.img} />
                </div>
                <div>{post.date}</div>
            </div>
        )
    }
}

export default PostContent