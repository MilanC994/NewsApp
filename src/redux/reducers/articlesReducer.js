import {
  FETCH_ARTICLES_SUCCESS,
  SET_SEARCH_TERM,
  SET_SORT_BY,
  SET_COUNTRY,
  FETCH_MORE_ARTICLES_SUCCESS,
} from '../constants'

const initialState = {
  articles: [],
  searchTerm: '',
  sortBy: 'publishedAt',
  country: 'us',
  page: 1,
  totalResults: null,
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS: {
      return {
        ...state,
        articles: action.payload.articles,
        totalResults: action.payload.totalResults,
        page: 1,
      }
    }
    case FETCH_MORE_ARTICLES_SUCCESS: {
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles],
        page: state.page + 1,
        totalResults: action.payload.totalResults,
      }
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload,
      }
    }
    case SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload,
      }
    }
    case SET_COUNTRY: {
      return {
        ...state,
        country: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default articlesReducer
