import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Post from './Post'
import Comment from './Comment'
import Invalid from './Invalid'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'
import { Col, FormControl, Button, PageHeader, Panel, Modal, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

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

        // Validate the values entered
        let errorMsg = "";
        if (!e.target['author'] || e.target['author'].value === "") {
            errorMsg = errorMsg.concat("Please enter an author\n");
        }
        if (!e.target['body'] || e.target['body'].value === "") {
            errorMsg = errorMsg.concat("Please enter a message");
        }

        if (errorMsg !== "") {
            confirmAlert({
                title: 'Error(s) in form', 
                message: errorMsg,
                confirmLabel: 'OK',
                onConfirm: () => {},
            })
        } else {
            const newComment = {
                id: Math.random().toString(36).substr(-8),
                parentId: post.id,
                timestamp: Date.now(),
                author: e.target['author'].value,
                body: e.target['body'].value
            }
            onAddComment(newComment);
        }
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
            comments
        } = this.props;
        const {
            showModal
        } = this.state;

        return (
            <div>
                <Header />
                <PageHeader>
                    <small>
                        <div className="page-title">
                            Post Details
                        </div>
                    </small>
                </PageHeader>
                {typeof post === 'undefined' && (
                    <Invalid />
                )}
                {typeof post !== 'undefined' && (
                <Panel>
                    <div className="posts-grid">
                        <div className="list-post-date">
                        Posted by {post.author}
                        </div>
                        <div className="list-post-votes">
                        </div>
                    </div>
                    <br />
                    <Post key={post.id}
                          id={post.id}
                          comments={comments ? comments : {}}/>
                    <h4 className="posts-grid">
                        {post.body}
                    </h4>
                    <hr />
                    <Button bsStyle="info" onClick={this.open.bind(this)}>Add a comment</Button>
                    <div className="list-posts-content">
                        <h4 className="page-title">Comments</h4>
                        <ol className="posts-grid">
                        {comments.length > 0 && comments.map((comment) => (
                            <Comment key={comment.id}
                                comment={comment} />
                            ))}
                        </ol>
                    </div>
                </Panel>
                )}

                <Modal show={showModal} onHide={this.close.bind(this)}>
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
                    <Button className="btn btn-cancel" onClick={this.close.bind(this)}>Close</Button>
                    <Button className="btn-primary" type="submit" onClick={this.close.bind(this)}>Submit</Button>
                </Modal.Footer>
                </Form>
                </Modal>

                <Footer />
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
      onAddComment: (data) => dispatch(addComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

