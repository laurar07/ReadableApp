import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux'
import { ButtonGroup, Glyphicon, Col, FormControl, Button, PageHeader, Panel } from 'react-bootstrap';
import { thumbsUpPost, thumbsDownPost } from '../actions/posts'

class Post extends Component {
    thumbsUp(e) {
      if (typeof this.props.post !== 'undefined')
        this.props.onThumbsUpPost(this.props.post.id); 
    }
    thumbsDown(e) {
      if (typeof this.props.post !== 'undefined')
        this.props.onThumbsDownPost(this.props.post.id); 
    }
    render() {
        const {
          post,
          onThumbsUpPost,
          onThumbsDownPost
        } = this.props;
        return (
            <div>
            {typeof post !== 'undefined' && (
            <li className="posts-grid">
                <div className="list-posts-content">
                    <Link to={`/detail/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>
                    <div className="list-post-date">
                      Submitted {moment(parseInt(post.timestamp,10)).calendar()}
                    </div>
                    <div className="list-post-votes">
                      {post.voteScore} votes
                      <ButtonGroup>
                          <Button onClick={this.thumbsUp.bind(this)}><Glyphicon glyph="thumbs-up" /></Button>
                          <Button onClick={this.thumbsDown.bind(this)}><Glyphicon glyph="thumbs-down" /></Button>
                      </ButtonGroup>
                    </div>
                  </div>
            </li>
            )}
            </div>
        )
    }
}

function mapStateToProps({posts}, {id}) {
    return {
        post: typeof posts !== 'undefined' ? posts[id] : 'undefined'
    };
}

function mapDispatchToProps(dispatch) {
  return {
      onThumbsUpPost: (data) => dispatch(thumbsUpPost(data)),
      onThumbsDownPost: (data) => dispatch(thumbsDownPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);