import { getPosts, getComments, createPost, modifyPost, discardPost, upVotePost, downVotePost } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const THUMBSUP_POST = 'THUMBSUP_POST'
export const THUMBSDOWN_POST = 'THUMBSDOWN_POST'
export const INIT_COMMENTS = 'INIT_COMMENTS'

export function fetchPosts() {
    return ((dispatch) => {
        getPosts()
        .then(posts => dispatch({
            type: GET_POSTS,
            posts        
        }))
        .then(data => fetchComments(dispatch, data.posts, 0)
    )}
    )
}

export function fetchComments(dispatch, posts, i) {
    const post = posts[i];
    console.log(`Item at index ${i} is ${posts[i]}`);
    if (typeof post !== 'undefined') {
        const parentId = post['id'];
        getComments(parentId)
        .then(comments => dispatch({
            type: GET_COMMENTS,
            comments,
            parentId
        }))
        .then(() => fetchComments(dispatch, posts, i + 1))
    }
}

export function addPost(data) {
    return (dispatch) => createPost(data)
        .then((post) => dispatch({
            type: ADD_POST,
            post      
        }))
        .then((res) => dispatch({
            type: INIT_COMMENTS,
            pid: res.post.id
        })
    );
}

export function editPost(data) {
    return (dispatch) => modifyPost(data)
      .then((post) => dispatch({
          type: EDIT_POST,
          post
    }));
}

export function deletePost(id) {
    return dispatch => discardPost(id)
        .then(() => dispatch({
            type: DELETE_POST,
            id
    }));
}

export function thumbsUpPost(id) {
    return dispatch => upVotePost(id)
        .then(post => dispatch( {
            type: THUMBSUP_POST,
            post,        
    }))
}

export function thumbsDownPost(id) {
    return dispatch => downVotePost(id)
        .then((post) => dispatch({
            type: THUMBSDOWN_POST,
            post
    }));
}
