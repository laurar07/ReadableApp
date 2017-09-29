import _ from 'lodash';
import { GET_POSTS, ADD_POST } from '../actions/posts'

export default function postsReducer (state = {}, action) {
    switch(action.type) {
        case GET_POSTS:
            const filterPosts = action.posts.filter((post) => !post.deleted);
            const posts = _.mapKeys(filterPosts,'id');
            return {...posts};
        case ADD_POST:
            return {...state, [action.id] : { 
                    id: action.id, 
                    timestamp: 
                    action.timestamp, 
                    author: action.author, 
                    title: action.title, 
                    category: action.category, 
                    body: action.body }};
        default:
            return state;
    }
}