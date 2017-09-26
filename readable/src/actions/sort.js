export const CHANGE_SORT_BY_POSTS = 'CHANGE_SORT_BY_POSTS'

export function updateSortByPosts({ sortBy }) {
    return {
        type: CHANGE_SORT_BY_POSTS,
        sortBy       
    };
}