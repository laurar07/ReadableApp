import React, { Component } from 'react'
import Header from './Header'
import _ from 'lodash';
import { connect } from 'react-redux'
import { categoryChanged } from '../actions/category'
import { addPost } from '../actions/posts'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, PageHeader } from 'react-bootstrap';
import { Link, Router } from 'react-router-dom';

class PostView extends Component {
    onSubmit(e) {
        e.preventDefault();
        const { 
            history, 
            onAddPost, 
            selectedCategory,
            category,
            categories 
        } = this.props;
        const newPost = {
            id: Math.random().toString(36).substr(-8),
            timestamp: Date.now(),
            title: e.target['title'].value,
            author: e.target['author'].value,
            category: selectedCategory || category || categories[0].name,
            body: e.target['body'].value
        }
        //console.log(post);
        //const oldPost = post;
        //if (typeof oldPost === 'undefined') {
            this.props.onAddPost(newPost);
            history.push('/');
        /*}
        else {
            editPost({...newPost, id : oldPost.id});
            history.push(`/${newPost.category}/${oldPost.id}`);
        }*/

    }

    render() {
        const {
            category,
            categories,
            onCategoryChanged,
            selectedCategory
        } = this.props;
        console.log(`Category is ${category}`)
        return (
            <div>
                <Header />
                <PageHeader>
                    <small>
                        Create or Edit Post
                    </small>
                </PageHeader>
                <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                    <FormGroup controlId="formControlsSelect" name="ctgry">
                        <Col componentClass={ControlLabel} sm={2}>
                            Category
                        </Col>
                        <Col sm={10}>
                            {(category === 'undefined' || category === 'all' || !(categories.some((cat) => cat.name === category))) && (
                            <FormControl componentClass="select" defaultValue={categories[0]} id="ctgry" onChange={(e) => onCategoryChanged({ category: e.target.value })}>
                                {categories.map((cat) => ( 
                                    <option value={cat.name} key={cat.name}>{cat.name}</option> 
                                ))}
                            </FormControl>
                            )}
                            {(category !== 'undefined' && category !== 'all' && (categories.some((cat) => cat.name === category))) && (
                                <ControlLabel>{category}</ControlLabel>
                            )}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalTitle" name="title">
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl type="title" id="title" inputRef={ref => { this.input = ref; }} placeholder="Insert post title" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalAuthor" name="author">
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl type="author" id="author" inputRef={ref => { this.input = ref; }} placeholder="Insert your name" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalMessage" name="body">
                        <Col componentClass={ControlLabel} sm={2}>
                            Message
                        </Col>
                        <Col sm={10}>
                            <FormControl type="body" id="body" inputRef={ref => { this.input = ref; }} placeholder="Insert your message" />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                Post
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

function mapStateToProps (state, {match : {params : {category}}}) {
  return {
      categories: _.values(state.categories),
      category: typeof category !== 'undefined' ? category : "all",
      selectedCategory: state.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCategoryChanged: (data) => dispatch(categoryChanged(data)),
    onAddPost: (data) => dispatch(addPost(data))
    /*getPosts: (data) => dispatch(fetchPosts()),
    getCategories: (data) => dispatch(fetchCategories()),
    onSortByChanged: (data) => dispatch(updateSortByPosts(data))*/
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);