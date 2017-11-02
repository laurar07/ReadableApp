import { CHANGE_SORT_BY_POSTS } from '../actions/types'

export const VOTE_SCORE = 'voteScore';
export const TIMESTAMP = 'timestamp';
export const AUTHOR = 'author';
export const TITLE = 'title';

export default function sortReducer (state = {posts: VOTE_SCORE, comments: VOTE_SCORE}, action) {
    switch(action.type) {
        case CHANGE_SORT_BY_POSTS:
            return {
                posts: action.sortBy,
                comments: state.comments
            };
        default:
            return state;
    }
}