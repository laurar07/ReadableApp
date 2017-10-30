import { createComment, modifyComment, discardComment, upVoteComment, downVoteComment } from '../utils/ReadableAPI'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const THUMBSUP_COMMENT = 'THUMBSUP_COMMENT'
export const THUMBSDOWN_COMMENT = 'THUMBSDOWN_COMMENT'

export function addComment(data) {
    return (dispatch) => createComment(data)
        .then(comment => dispatch({
            type: ADD_COMMENT,
            comment
        }
    ));
  }
  
export function editComment(data) {
    return (dispatch) => modifyComment(data)
        .then(comment => dispatch({
            type: EDIT_COMMENT,
            comment           
        }
    ));
  }
  
export function deleteComment(id) {
    return (dispatch) => discardComment(id)
        .then((comment) => dispatch({
            type: DELETE_COMMENT,
            comment
        }
    ));
}

export function thumbsUpComment(id) {
    return dispatch => upVoteComment(id)
        .then(comment => dispatch( {
            type: THUMBSUP_COMMENT,
            comment,        
    }))
}

export function thumbsDownComment(id) {
    return dispatch => downVoteComment(id)
        .then((comment) => dispatch({
            type: THUMBSDOWN_COMMENT,
            comment
    }));
}
  