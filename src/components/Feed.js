import React, { Component } from 'react';
import data from './data/posts.json'
import FeedItem from './FeedItem';
import Pagination from './Pagination';

export class Feed extends Component {
  state = {
    currentPage: 1,
    postsPerPage: 5,
  };

  render() {
    const { posts } = this.props;

    const { currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });


    return (
      <div className='container mt-5'>
        {currentPosts.map(post => (
          <FeedItem post={post} key={post.id} />
        ))}
        <br/>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
      </div>
    )
  }
}

export default Feed