import React, { Component } from 'react'
import Header from './Header'
import _ from 'lodash';
import { connect } from 'react-redux'
import { categoryChanged } from '../actions/category'
import { addPost, editPost } from '../actions/posts'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, PageHeader } from 'react-bootstrap';
import { Link, Router, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Dropdown } from 'semantic-ui-react'

class PostView extends Component {
    componentDidMount() {
        const {selectedCategory, initialize, post }  = this.props;
        let initData = {};
        if (typeof post === 'undefined' && selectedCategory !== 'all') {
            initData = {category : selectedCategory};
        }
        else {
            initData = post;
        }
        initialize(initData);
    }

    renderField(field) {
        const { meta: {touched, error}, defVal } = field;
        const className = `form-group ${touched &&  error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text" 
                    {...field.input} 
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderCategory(field) {
        const { meta: {touched, error}, options } = field;
        const className = `form-group ${touched &&  error ? 'has-danger' : ''}`;
        const selectedCategory = this.props.selectedCategory;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <div>
                    <Dropdown
                        selection
                        disabled={selectedCategory !== 'all'}
                        {...field.input}
                        placeholder={field.label}
                        options={options}
                        value={field.input.value}
                        id={field.input.value}
                        key={field.input.value}
                        onChange={(param,data) => field.input.onChange(data.value)}
                    />
                    </div>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        const { 
            history, 
            onAddPost, 
            onEditPost,
            selectedCategory,
            category,
            categories,
            post
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
        const oldPost = post;
        if (typeof oldPost === 'undefined') {
            onAddPost(newPost);
        } else {
            onEditPost({...newPost, id : oldPost.id});
        }
        history.push(`/`);
    }

    render() {
        const {
            post,
            category,
            categories,
            onCategoryChanged,
            selectedCategory
        } = this.props;
        let postTitle = post && post.title ? post.title : "Insert your title";
        let postAuthor = post && post.title ? post.author : "Insert your name";
        let postMessage = post && post.body ? post.body : "Insert your message";
        const required = value => (value ? undefined : 'This field is required');
        const maxLength = max => value =>
            (value && value.length > max ? `Must be ${max} characters or less` : undefined);
        const maxLength50 = maxLength(50);
        const maxLength140 = maxLength(140);
        const maxLength500 = maxLength(500);

        const CancelButton = withRouter(({history}) => (
          <a className="btn btn-danger" onClick={() => {
            history.push(`/`);
          }}>Cancel</a>
        ))

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
                        {/*<Field
                            label="Title for Post"
                            name="title"
                            component={this.renderField}
                            defVal={post && post.title ? post.title : ""}
                        />
                        <Field
                            label="Author"
                            name="author"
                            component={this.renderField}
                            defVal={post && post.author ? post.author : ""}
                        />
                        <Field
                            label="Category"
                            name="category"
                            options={categories}
                            component={this.renderCategory.bind(this)}
                        />
                        <Field
                            label="Post Content"
                            name="body"
                            component={this.renderField}
                            defVal={post && post.body ? post.body : ""}
                        />
                        <button type="submit" className="btn btn-primary">Save</button>
                        <Link to={post ? `/${post.category}/${post.id}` : selectedCategory === 'all' ? '/' : `/${selectedCategory}`} className="btn btn-danger ">Cancel</Link>*/}

                    <FormGroup name="ctgry">
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

                    <FormGroup name="title">
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl type="title" id="title" inputRef={ref => { this.input = ref; }} defaultValue={`${postTitle}`} >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup name="author">
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl type="author" id="author" inputRef={ref => { this.input = ref; }} defaultValue={`${postAuthor}`} />
                        </Col>
                    </FormGroup>

                    <FormGroup name="body">
                        <Col componentClass={ControlLabel} sm={2}>
                            Message
                        </Col>
                        <Col sm={10}>
                            <FormControl type="body" id="body" inputRef={ref => { this.input = ref; }} defaultValue={`${postMessage}`} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <CancelButton />
                            <Button type="submit" className="post-view-cancel btn btn-primary">
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Please enter a title";
    }
    if (!values.author) {
        errors.author = "Please enter the author of this post";
    }
    if (!values.category) {
        errors.category = "Please enter the category of this post";
    }    
    if (!values.body) {
        errors.body = "Please enter some content";
    }
    return errors;

}

function mapStateToProps (state, {match : {params : {id, category}}}) {
  return {
      post: state.posts[id],
      categories: _.values(state.categories),
      category: typeof category !== 'undefined' ? category : "all",
      selectedCategory: state.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCategoryChanged: (data) => dispatch(categoryChanged(data)),
    onAddPost: (data) => dispatch(addPost(data)),
    onEditPost: (data) => dispatch(editPost(data)),
  }
}

export default reduxForm({
    validate,
    form: 'PostViewForm'
})(connect(mapStateToProps, mapDispatchToProps)(PostView));