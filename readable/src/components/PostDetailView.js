import React, { Component } from 'react'
import Header from './Header'
import Post from './Post'
import Comment from './Comment'
import _ from 'lodash';
import { connect } from 'react-redux'
import { categoryChanged } from '../actions/category'
import { addPost, deletePost } from '../actions/posts'
import { addComment } from '../actions/comments'
import { ButtonGroup, Glyphicon, Col, FormControl, Button, PageHeader, Panel, Modal, FormGroup, ControlLabel, HelpBlock, Form } from 'react-bootstrap';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { Link, Router } from 'react-router-dom';

class PostDetailView extends Component {
    state = {
        showModal: false
    }
    getInitialState() {
        return { 
            showModal: false 
        };
    }

    close() {
        this.setState({ 
            showModal: false 
        });
    }

    open() {
        this.setState({ 
            showModal: true 
        });
    }

    onCommentSubmit(e) {
        e.preventDefault();
        const {
            onAddComment,
            post
        } = this.props;
        const newComment = {
            id: Math.random().toString(36).substr(-8),
            parentId: post.id,
            timestamp: Date.now(),
            author: e.target['author'].value,
            body: e.target['body'].value
        }
        onAddComment(newComment);
    }

    onDeleteClick() {
        const {
            post,
            history,
            onDeletePost
        } = this.props;

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
    }

    render() {
        const {
            post,
            comments,
            history
        } = this.props;
        const {
            showModal
        } = this.state;

        return (
            <div>
                <Header />
                <PageHeader>
                    <small>
                        Post Details
                    </small>
                </PageHeader>
                {typeof post !== 'undefined' && (
                <Panel>
                    <div className="posts-grid">
                        <div className="list-post-date">
                        Posted by {post.author}
                        </div>
                        <div className="list-post-votes">
                            <ButtonGroup>
                                <Button onClick={() => history.push(`/post/${post.id}`)}><Glyphicon glyph="pencil" /></Button>
                                <Button onClick={this.onDeleteClick.bind(this)}><Glyphicon glyph="trash" /></Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <br />
                    <Post key={post.id}
                          id={post.id}/>
                    <h4 className="posts-grid">
                        {post.body}
                    </h4>
                    <hr />
                    <Button bsStyle="info" onClick={this.open.bind(this)}>Add a comment</Button>
                    <div className="list-posts-content">
                        <h5>Comments</h5>
                        <ol className="posts-grid">
                        {comments.length > 0 && comments.map((comment) => (
                            <Comment key={comment.id}
                                comment={comment} />
                            ))}
                        </ol>
                    </div>
                </Panel>
                )}

                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Form onSubmit={this.onCommentSubmit.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup name="author">
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl type="author" id="author" inputRef={ref => { this.input = ref; }} />
                        </Col>
                    </FormGroup>

                    <FormGroup name="body">
                        <Col componentClass={ControlLabel} sm={2}>
                            Comment
                        </Col>
                        <Col sm={10}>
                            <FormControl type="body" id="body" inputRef={ref => { this.input = ref; }} />
                        </Col>
                    </FormGroup>  
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                    <Button type="submit" onClick={this.close.bind(this)}>Submit</Button>
                </Modal.Footer>
                </Form>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({posts, comments}, {match : {params : {id}}}) {
    const checkedComments = comments === 'undefined' || typeof comments[id] === 'undefined' ? [] : comments[id];
    return {
        post: typeof posts !== 'undefined' ? posts[id] : { title: 'N/A' },
        comments : checkedComments
    };
}

function mapDispatchToProps(dispatch) {
  return {
      onDeletePost: (data) => dispatch(deletePost(data)),
      onAddComment: (data) => dispatch(addComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

