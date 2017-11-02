import _ from 'lodash';
import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, THUMBSUP_POST, THUMBSDOWN_POST } from '../actions/types'

export default function postsReducer (state = {}, action) {
    switch(action.type) {
        case GET_POSTS:
            const filterGetPosts = action.posts.filter((post) => !post.deleted);
            const filteredGetPosts = _.mapKeys(filterGetPosts,'id');
            return {...filteredGetPosts};
        case ADD_POST:
            return {...state, [action.post.id] : action.post};
        case EDIT_POST:
            return {...state, [action.post.id] : action.post};
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