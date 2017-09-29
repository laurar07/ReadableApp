import { ON_CATEGORY_CHANGED } from '../actions/category'

export default function categoryReducer (state = "", action) {
    switch(action.type) {
        case ON_CATEGORY_CHANGED:
            return action.category;
        default:
            return state;
    }
}