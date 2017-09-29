import { combineReducers } from 'redux'
import postsReducer from './posts'
import categoryReducer from './category'
import categoriesReducer from './categories'
import sortReducer from './sort'

const rootReducer = combineReducers({
  posts: postsReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  sortBy: sortReducer
})

export default rootReducer