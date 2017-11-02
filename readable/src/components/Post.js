import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux'
import { ButtonGroup, Button, Glyphicon, Row, Col } from 'react-bootstrap';
import { thumbsUpPost, thumbsDownPost, deletePost } from '../actions/posts'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'

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
          comments,
          onDeletePost
        } = this.props;
        const EditButton = withRouter(({history}) => (
            <Button onClick={() => history.push(`/post/${post.id}`)}><Glyphicon glyph="pencil" /></Button>
        ))
        const DeleteButton = withRouter(({history}) => (
            <Button onClick={() => {
                confirmAlert({
                    title: 'Confirm delete', 
                    message: 'Are you sure you want to delete this post?',
                    confirmLabel: 'Confirm',
                    cancelLabel: 'Cancel',
                    onConfirm: () => {
                        onDeletePost(post.id);
                        history.push('/');
                    },
                    onCancel: () => {},
                })
            }}><Glyphicon glyph="trash" /></Button>
        ))
        return (
            <div>
            {typeof post !== 'undefined' && (
            <li className="posts-grid">
                <div className="list-posts-content">
                    <Row>
                        <div>
                            <Col xs={9} md={6}>
                                <div className="list-post-date">
                                    <Link to={`/${post.category}/${post.id}`}>
                                        <h3>{post.title}</h3>
                                    </Link>
                                </div>
                            </Col>
                            <Col xs={9} md={6}>
                                <div className="list-post-votes">
                                    <ButtonGroup>
                                        <EditButton />
                                        <DeleteButton />
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            Submitted {moment(parseInt(post.timestamp,10)).calendar()}
                        </Col>
                        <Col xs={6} md={4}>
                            {comments ? comments.length : 0} comments
                        </Col>
                        <Col xs={6} md={4}>
                            <div className="list-post-votes">
                            {post.voteScore} votes
                            <ButtonGroup bsSize="small">
                                <Button onClick={this.thumbsUp.bind(this)}><Glyphicon glyph="thumbs-up" /></Button>
                                <Button onClick={this.thumbsDown.bind(this)}><Glyphicon glyph="thumbs-down" /></Button>
                            </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
                  </div>
            </li>
            )}
            </div>
        )
    }
}

function mapStateToProps({posts}, {id, comments}) {
    return {
        post: typeof posts !== 'undefined' ? posts[id] : 'undefined',
        comments
    };
}

function mapDispatchToProps(dispatch) {
  return {
      onDeletePost: (data) => dispatch(deletePost(data)),
      onThumbsUpPost: (data) => dispatch(thumbsUpPost(data)),
      onThumbsDownPost: (data) => dispatch(thumbsDownPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);