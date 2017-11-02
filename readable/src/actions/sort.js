import { CHANGE_SORT_BY_POSTS } from './types'

export function updateSortByPosts({ sortBy }) {
    return {
        type: CHANGE_SORT_BY_POSTS,
        sortBy       
    };
}