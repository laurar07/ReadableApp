import React, { Component } from 'react'
import Post from './Post'
import PostView from './PostView'
import Header from './Header'
import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { updateSortByPosts } from '../actions/sort'
import { connect } from 'react-redux'
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import sortBy from 'sort-by';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class DefaultView extends Component {
    render() {
        const {
          posts,
          category,
          categories,
          onSortByChanged
        } = this.props
        const sortOptions = ['voteScore', 'timestamp', 'author', 'title'];
        const PostViewButton = withRouter(({history}) => (
          <a onClick={() => {
            console.log(`The category: ${this.props.category}`);
            history.push(`/post/category/${this.props.category}`);
          }}>Add a post</a>
        ))
        return (
            <div>
              <Header />
              <div className="list-categories">
                <ul className="categories-grid">
                  <li key={'all'}>
                      all
                  </li>
                  {categories.length > 0 && categories.map((category) => (
                    <Link to={`/category/${category.name}`}>
                    <li key={category.name}>
                      {category.name}
                    </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="sort-by">
                <DropdownButton bsStyle={"primary"} title={"Sort By"} key={0} id={`dropdown-basic-${0}`} onSelect={(e) => onSortByChanged({ sortBy: e })}>
                  {sortOptions.map((sortOption, idx) => (
                    <MenuItem eventKey={sortOptions[idx]} key={sortOptions[idx]}>
                      {sortOptions[idx]}
                    </MenuItem>
                  ))}
                </DropdownButton>
              </div>
              <div className="list-posts-content">
                <ol className="posts-grid">
                  {posts.length > 0 && posts.map((post) => (
                    <Post key={post.id}
                          post={post} />
                  ))}
                </ol>
                {/*<BookShelf
                  title="Currently Reading"
                  books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                  onUpdateBook={(book, shelf) => {
                      this.updateBook(book, shelf);
                  }}
                />
                <BookShelf
                  title="Want to Read"
                  books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                  onUpdateBook={(book, shelf) => {
                      this.updateBook(book, shelf);
                  }}
                />
                <BookShelf
                  title="Read"
                  books={this.state.books.filter((book) => book.shelf === "read")}
                  onUpdateBook={(book, shelf) => {
                      this.updateBook(book, shelf);
                  }}
                />*/}
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