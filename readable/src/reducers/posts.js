import _ from 'lodash';
import { GET_POSTS } from '../actions/posts'

export default function postsReducer (state = {}, action) {
    switch(action.type) {
        case GET_POSTS:
            const filterPosts = action.posts.filter((post) => !post.deleted);
            const posts = _.mapKeys(filterPosts,'id');
            return {...posts};

        default:
            return state;
    }
}