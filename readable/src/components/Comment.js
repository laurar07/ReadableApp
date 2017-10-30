import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux'
import { ButtonGroup, Glyphicon, Col, FormControl, Button, Row, Modal, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import { thumbsUpComment, thumbsDownComment, editComment, deleteComment } from '../actions/comments'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Comment extends Component {
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
    
    thumbsUp(e) {
      if (typeof this.props.comment !== 'undefined')
        this.props.onThumbsUpComment(this.props.comment.id); 
    }

    thumbsDown(e) {
      if (typeof this.props.comment !== 'undefined')
        this.props.onThumbsDownComment(this.props.comment.id); 
    }

    editComment(e) {
        this.open();
    }

    deleteComment(e) {
        const {
            comment,
            onDeleteComment
        } = this.props;

        confirmAlert({
            title: 'Confirm delete', 
            message: 'Are you sure you want to delete this comment?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => {
                onDeleteComment(comment.id);
            },
            onCancel: () => {},
        })
    }

    onCommentEdit(e) {
        e.preventDefault();
        const {
            onEditComment,
            comment
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
            const editComment = {
                id: comment.id,
                parentId: comment.parentId,
                timestamp: Date.now(),
                author: e.target['author'].value,
                body: e.target['body'].value
            }
            onEditComment(editComment);
        }
    }
    render() {
        const {
          comment
        } = this.props;
        return (
            <div>
            {typeof comment !== 'undefined' && (
            <li>
                <div>
                    <Row>
                        <Col xs={3} md={2}>
                            <code>
                                {comment.author}
                            </code>
                        </Col>
                        <Col xs={3} md={2}>
                            <code>
                                Submitted {moment(parseInt(comment.timestamp,10)).calendar()}
                            </code>
                        </Col>
                        <Col xs={6} md={4}>
                            <code>
                                {comment.body}
                            </code>
                        </Col>
                        <Col xs={3} md={2}>
                            <code>
                                {comment.voteScore} votes
                            </code>
                        </Col>
                        <Col xsHidden md={2}>
                            <code>
                                <ButtonGroup bsSize="small">
                                    <Button onClick={this.thumbsUp.bind(this)}><Glyphicon glyph="thumbs-up" /></Button>
                                    <Button onClick={this.thumbsDown.bind(this)}><Glyphicon glyph="thumbs-down" /></Button>
                                    <Button onClick={this.editComment.bind(this)}><Glyphicon glyph="pencil" /></Button>
                                    <Button onClick={this.deleteComment.bind(this)}><Glyphicon glyph="trash" /></Button>
                                </ButtonGroup>
                            </code>
                        </Col>
                    </Row>
                </div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Form onSubmit={this.onCommentEdit.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup name="author">
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl type="author" id="author" inputRef={ref => { this.input = ref; }} defaultValue={comment.author} />
                        </Col>
                    </FormGroup>

                    <FormGroup name="body">
                        <Col componentClass={ControlLabel} sm={2}>
                            Comment
                        </Col>
                        <Col sm={10}>
                            <FormControl type="body" id="body" inputRef={ref => { this.input = ref; }} defaultValue={comment.body} />
                        </Col>
                    </FormGroup>  
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={this.close.bind(this)}>Close</Button>
                    <Button className="btn btn-primary" type="submit" onClick={this.close.bind(this)}>Submit</Button>
                </Modal.Footer>
                </Form>
                </Modal>
            </li>
            )}
            </div>
        )
    }
}

function mapStateToProps(state, {comment}) {
    return {
        comment
    };
}

function mapDispatchToProps(dispatch) {
  return {
      onThumbsUpComment: (data) => dispatch(thumbsUpComment(data)),
      onThumbsDownComment: (data) => dispatch(thumbsDownComment(data)),
      onEditComment: (data) => dispatch(editComment(data)),
      onDeleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);