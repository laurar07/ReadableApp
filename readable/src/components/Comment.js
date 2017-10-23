import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux'
import { ButtonGroup, Glyphicon, Col, FormControl, Button, PageHeader, Panel, Row, FieldGroup } from 'react-bootstrap';
import { thumbsUpComment, thumbsDownComment, deleteComment } from '../actions/comments'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Comment extends Component {
    thumbsUp(e) {
      if (typeof this.props.comment !== 'undefined')
        this.props.onThumbsUpComment(this.props.comment.id); 
    }
    thumbsDown(e) {
      if (typeof this.props.comment !== 'undefined')
        this.props.onThumbsDownComment(this.props.comment.id); 
    }
    editComment(e) {

    }
    deleteComment(e) {
        const {
            comment,
            history,
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
    render() {
        const {
          comment,
          onThumbsUpComment,
          onThumbsDownComment,
          onDeleteComment
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
      onDeleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);