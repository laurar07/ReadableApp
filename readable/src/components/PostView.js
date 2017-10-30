import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import _ from 'lodash';
import { connect } from 'react-redux'
import { categoryChanged } from '../actions/category'
import { addPost, editPost } from '../actions/posts'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, PageHeader, DropdownButton, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class PostView extends Component {
    onSubmit(e) {
        e.preventDefault();
        const { 
            history, 
            onAddPost, 
            onEditPost,
            category,
            post
        } = this.props;

        // Validate the values entered
        let errorMsg = "";
        if (!e.target['title'] || e.target['title'].value === "") {
            errorMsg = errorMsg.concat("Please enter a title\n");
        }
        if (!e.target['author'] || e.target['author'].value === "") {
            errorMsg = errorMsg.concat("Please enter an author\n");
        }
        if (!category) {
            errorMsg = errorMsg.concat("Please select the category of this post\n");
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
            const newPost = {
                id: Math.random().toString(36).substr(-8),
                timestamp: Date.now(),
                title: e.target['title'].value,
                author: e.target['author'].value,
                category: category,
                body: e.target['body'].value
            }
            const oldPost = post;
            if (typeof oldPost === 'undefined') {
                onAddPost(newPost);
            } else {
                onEditPost({...newPost, id : oldPost.id});
            }
            history.push(`/`);
        }
    }

    render() {
        const {
            post,
            category,
            categories,
            onCategoryChanged,
        } = this.props;

        const CancelButton = withRouter(({history}) => (
          <a className="btn btn-danger" onClick={() => {
            history.push(`/`);
          }}>Cancel</a>
        ))

        return (
            <div>
                <Header />
                <PageHeader>
                    <small>
                        <div className="page-title">
                            { post ? 'Edit ' : 'Create a new ' } Post
                        </div>
                    </small>
                </PageHeader>
                <Form horizontal onSubmit={this.onSubmit.bind(this)} className="posts-form">
                    <FormGroup name="title">
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={8}>
                            <FormControl type="title" id="title" inputRef={ref => { this.input = ref; }} key={`${post ? post.title : ""}`} defaultValue={`${post ? post.title : ""}`} >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup name="ctgry">
                        <Col componentClass={ControlLabel} sm={2}>
                            Category
                        </Col>
                        <Col sm={8}>
                            <DropdownButton bsStyle={"primary"} title={"Select"} key={0} id={`dropdown-basic-${0}`} onSelect={(e) => onCategoryChanged({ category: e })}>
                                {categories.map((cat) => {
                                    if (cat.name === category) {
                                        return (<MenuItem eventKey={cat.name} key={cat.name} active>{cat.name}</MenuItem>)
                                    } else {
                                        return (<MenuItem eventKey={cat.name} key={cat.name}>{cat.name}</MenuItem>)
                                    }})}
                            </DropdownButton>
                        </Col>
                    </FormGroup>

                    <FormGroup name="author">
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={8}>
                            <FormControl type="author" id="author" inputRef={ref => { this.input = ref; }} key={`${post ? post.author : ""}`} defaultValue={`${post ? post.author : ""}`} />
                        </Col>
                    </FormGroup>

                    <FormGroup name="body">
                        <Col componentClass={ControlLabel} sm={2}>
                            Message
                        </Col>
                        <Col sm={8}>
                            <FormControl type="body" id="body" inputRef={ref => { this.input = ref; }} key={`${post ? post.body : ""}`} defaultValue={`${post ? post.body : ""}`} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <CancelButton />
                            <Button type="submit" className="post-view-cancel btn btn-primary">
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps ({posts, categories, category}, {match : {params : {id}}}) {
  return {
      post: posts[id],
      categories: _.values(categories),
      category: category ? category : posts[id] ? posts[id].category : "",
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCategoryChanged: (data) => dispatch(categoryChanged(data)),
    onAddPost: (data) => dispatch(addPost(data)),
    onEditPost: (data) => dispatch(editPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);