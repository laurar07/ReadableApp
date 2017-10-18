import React, { Component } from 'react'
import Header from './Header'
import Post from './Post'
import _ from 'lodash';
import { connect } from 'react-redux'
import { categoryChanged } from '../actions/category'
import { addPost, deletePost } from '../actions/posts'
import { ButtonGroup, Glyphicon, Col, FormControl, Button, PageHeader, Panel } from 'react-bootstrap';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import { Link, Router } from 'react-router-dom';

class PostDetailView extends Component {
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
            history
        } = this.props;
        return (
            <div>
                <Header />
                <PageHeader>
                    <small>
                        Post Details
                    </small>
                </PageHeader>
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
                </Panel>
            </div>
        )
    }
}

function mapStateToProps({posts, comments}, {match : {params : {id}}}) {
    //const checkedComments = comments === 'undefined' || typeof comments[id] === 'undefined' ? [] : comments[id];
    return {
        post: typeof posts !== 'undefined' ? posts[id] : { title: 'N/A' }
        //comments : checkedComments
    };
}

function mapDispatchToProps(dispatch) {
  return {
      onDeletePost: (data) => dispatch(deletePost(data)),
    //onDeleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);

