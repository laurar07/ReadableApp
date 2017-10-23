import { combineReducers } from 'redux'
import postsReducer from './posts'
import categoryReducer from './category'
import categoriesReducer from './categories'
import sortReducer from './sort'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  posts: postsReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  sortBy: sortReducer,
  comments: commentsReducer
})

export default rootReducer