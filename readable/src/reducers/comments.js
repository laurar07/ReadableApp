import { GET_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, THUMBSUP_COMMENT, THUMBSDOWN_COMMENT, INIT_COMMENTS } from '../actions/types';

export default function commentsReducer (state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {...state, [action.parentId]: action.comments};
        case INIT_COMMENTS:
            return {...state, [action.pid] : []};
        case ADD_COMMENT:
            const parentId = action.comment.parentId;
            return {...state, [parentId] : state[parentId].concat(action.comment)};
        case EDIT_COMMENT:
            const filteredComments = state[action.comment.parentId].filter((comm) => comm.id !== action.comment.id );
            return {...state, ...{[action.comment.parentId] : filteredComments.concat(action.comment)}};
        case DELETE_COMMENT:
            const filteredCommentsDeleted = state[action.comment.parentId].filter((comm) => comm.id !== action.comment.id );
            return {...state, ...{[action.comment.parentId] : filteredCommentsDeleted}};
        case THUMBSUP_COMMENT:
        case THUMBSDOWN_COMMENT:
            const filteredCommentsVote = state[action.comment.parentId].filter((comm) => comm.id !== action.comment.id );
            return {...state, ...{[action.comment.parentId] : filteredCommentsVote.concat(action.comment)}};
        default:
            return state;
   } 
}
