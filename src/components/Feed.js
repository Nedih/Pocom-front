import React, { Component,useState, useEffect } from 'react';
import FeedItem from './FeedItem';
import Pagination from './Pagination';
import axios from '../../src/api/axios.js';

const POST_URL = '/api/v1/Posts/';

export class Feed extends Component {
  state = {
    posts:[],
    currentPage: 1,
    postsPerPage: 5,
  };

  componentDidMount() {
    let { posts } = this.props;
    if(posts!={} && posts!=undefined){
        this.setState({posts:posts});
    }
    else{
      axios.get(POST_URL,
        {
            headers: { 
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'  },
            withCredentials: true
        }
      ).then((response) => {
          this.setState({posts:response.data});
      })
    }
}
  render() {
    const { posts,currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });


    return (
      <div className='container mt-5'>
        {currentPosts.map(post => (
          <FeedItem key={post.id} post={post}/>
        ))}
        <br/>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
      </div>
    )
  }
}

export default Feed