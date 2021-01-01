import { FETCH_ARTICLES, SET_SEARCH_TERM, SET_SORT_BY, SET_COUNTRY } from "./constants"
  
  const initialState = {
    articles: [],
    searchTerm: '',
    sortBy: 'publishedAt',
    country:'us'
  }
  
  const reducer = (state = initialState, action ) => {
    switch (action.type) {
      case FETCH_ARTICLES: {
        console.log("EKSN PEJLOUD", action.payload)
          return {
            ...state, articles: action.payload
          }
      }
      case SET_SEARCH_TERM: {
          return {
            ...state, searchTerm: action.payload
          }
      }
      case SET_SORT_BY: {
          return {
            ...state, sortBy: action.payload
          }
      }
      case SET_COUNTRY: {
          return {
            ...state, country: action.payload
          }
      }
      default: {
        return state
      }
    }
  }
  
  export default reducer
  