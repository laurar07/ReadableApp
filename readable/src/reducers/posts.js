import _ from 'lodash';
import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, THUMBSUP_POST, THUMBSDOWN_POST } from '../actions/posts'

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
            return _.omit(state, action.id);
        case THUMBSUP_POST:
        case THUMBSDOWN_POST:
            const postIdVote = action.post.id;
            const postVote = state[postIdVote];
            return {...state, [postIdVote] : { ...postVote, voteScore : action.post.voteScore}};

        default:
            return state;
    }
}