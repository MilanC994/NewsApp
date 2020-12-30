import { FETCH_ARTICLES, SET_SEARCH_TERM, SET_SORT_BY } from "./constants"
  
  const initialState = {
    articles: [],
    searchTerm: '',
    sortBy: null,
    contentDetails:{
      id:'',
      title:'',
      name:'',
      original_name:'',
      poster_path:'',
      overview:'',
      release_date:'',
      first_air_date:''
    }
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
      default: {
        return state
      }
    }
  }
  
  export default reducer
  