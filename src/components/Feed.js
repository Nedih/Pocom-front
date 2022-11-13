import React, { Component } from 'react';
import data from './data/posts.json'
import FeedItem from './FeedItem';
import Pagination from './Pagination';

export class Feed extends Component {
  state = {
    posts: data,
    currentPage: 1,
    postsPerPage: 5,
  };
  componentDidMount() {
    const getPosts = async () => {
      this.setState({ posts: data });
    };

    getPosts();
  }

  render() {   
    const { currentPage, postsPerPage, posts } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div className='container mt-5'>
        {posts.slice(indexOfFirstPost,indexOfLastPost).map(post => (
          <div>
            <FeedItem post={post} />
            
          </div>
        ))}
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
      </div>
    )
  }
}

export default Feed