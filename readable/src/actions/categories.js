import { GET_CATEGORIES } from './types'
import { getCategories } from '../utils/ReadableAPI'

export function fetchCategories() { 
    return (dispatch) => getCategories()
        .then((categories) => dispatch({
            type: GET_CATEGORIES,
            categories        
        }
    ));
}