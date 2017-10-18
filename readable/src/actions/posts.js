import { getPosts, createPost, modifyPost, discardPost, upVotePost, downVotePost } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const THUMBSUP_POST = 'THUMBSUP_POST'
export const THUMBSDOWN_POST = 'THUMBSDOWN_POST'

export function fetchPosts() {
    return (dispatch) => getPosts()
        .then((posts) => dispatch({
            type: GET_POSTS,
            posts        
        }
    ));
}

export function addPost(data) {
    return (dispatch) => createPost(data)
        .then(() => dispatch({
            type: ADD_POST,
            id: data.id,
            timestamp: data.timestamp,
            title: data.title,
            author: data.author,
            category: data.category,
            body: data.body        
        }
    ));
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
