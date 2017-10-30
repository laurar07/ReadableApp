import React, { Component } from 'react'
import Post from './Post'
import Header from './Header'
import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { updateSortByPosts } from '../actions/sort'
import { connect } from 'react-redux'
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import sortBy from 'sort-by';
import { DropdownButton, MenuItem, PageHeader } from 'react-bootstrap';

class DefaultView extends Component {
    render() {
        const {
          posts,
          categories,
          comments,
          sortBy,
          onSortByChanged
        } = this.props
        const sortOptions = ['voteScore', 'timestamp', 'author', 'title'];
        const PostViewButton = withRouter(({history}) => (
          <a onClick={() => {
            history.push(`/post`);
          }}>Add a post</a>
        ))
        return (
            <div>
              <Header />
              <PageHeader>
                <small>
                  Home Page
                </small>
              </PageHeader>
              <div className="list-categories">
                <ul className="categories-grid">
                    Categories
                  <Link to={`/`}>
                  <li key={`all`}>
                      all
                  </li>
                  </Link>
                  {categories.length > 0 && categories.map((category) => (
                    <Link key={category.name} to={`/${category.name}`}>
                    <li key={category.name}>
                      {category.name}
                    </li>
                    </Link>
                  ))}
                </ul>
                <DropdownButton bsStyle={"primary"} title={"Sort By"} key={0} id={`dropdown-basic-${0}`} onSelect={(e) => onSortByChanged({ sortBy: e })}>
                  {sortOptions.map((sortOption, idx) => {
                    if (sortOption === sortBy) {
                      return (<MenuItem eventKey={sortOption} key={sortOption} active>{sortOption}</MenuItem>)
                    } else {
                      return (<MenuItem eventKey={sortOption} key={sortOption}>{sortOption}</MenuItem>)
                    }})}
                </DropdownButton>
              </div>
              <div className="list-posts-content">
                <ol className="posts-grid">
                  {posts.length > 0 && posts.map((post) => (
                    <Post key={post.id}
                          id={post.id}
                          comments={comments[post.id] ? comments[post.id] : {}} />
                  ))}
                </ol>
              </div>
              <div className="add-post">
                <PostViewButton />
              </div>
          </div>
        )
    }
}

function mapStateToProps (state, {match : {params : {category}}}) {
  return {
      categories: _.values(state.categories),
      category: typeof category !== 'undefined' ? category : "all",
      sortBy: state.sortBy.posts,
      comments: state.comments,
      posts: _.values(state.posts).filter((post) => (typeof category === "undefined" || post.category === category)).sort(sortBy(state.sortBy.posts))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (data) => dispatch(fetchPosts()),
    getCategories: (data) => dispatch(fetchCategories()),
    onSortByChanged: (data) => dispatch(updateSortByPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);