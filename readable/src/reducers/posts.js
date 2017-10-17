import _ from 'lodash';
import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/posts'

export default function postsReducer (state = {}, action) {
    switch(action.type) {
        case GET_POSTS:
            const filterGetPosts = action.posts.filter((post) => !post.deleted);
            const filteredGetPosts = _.mapKeys(filterGetPosts,'id');
            return {...filteredGetPosts};
        case ADD_POST:
            return {...state, [action.id] : { 
                    id: action.id, 
                    timestamp: 
                    action.timestamp, 
                    author: action.author, 
                    title: action.title, 
                    category: action.category, 
                    body: action.body }};
        case EDIT_POST:
            const postId = action.post.id;
            return {...state, [postId] : action.post};
        case DELETE_POST:
            //const filterDeletePosts = state.posts.filter((post) => post.id !== action.id);
            //const filteredDeletePosts = _.mapKeys(filterDeletePosts,'id');
            //return {...filteredDeletePosts};
            return _.omit(state, action.id);
        default:
            return state;
    }
}