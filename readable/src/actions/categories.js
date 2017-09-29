import { getCategories } from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function fetchCategories() { 
    return (dispatch) => getCategories()
        .then((categories) => dispatch({
            type: GET_CATEGORIES,
            categories        
        }
    ));
}