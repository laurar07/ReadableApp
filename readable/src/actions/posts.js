import { getPosts, createPost } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'

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
