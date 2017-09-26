import { getPosts } from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'

export function fetchPosts() {
    return (dispatch) => getPosts()
        .then((posts) => dispatch({
            type: GET_POSTS,
            posts        
        }
    ));
}
