import { combineReducers } from 'redux'
import postsReducer from './posts'
import categoriesReducer from './categories'
import sortReducer from './sort'

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  sortBy: sortReducer
})

export default rootReducer