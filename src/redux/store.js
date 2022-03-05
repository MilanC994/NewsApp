import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { articlesReducer, loadingReducer, errorReducer } from './reducers'

const rootReducer = combineReducers({
  articles: articlesReducer,
  loading: loadingReducer,
  error: errorReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
