import {
    FETCH_ARTICLES,
    SET_SEARCH_TERM,
    SET_SORT_BY,
    SET_COUNTRY,
    FETCH_MORE_ARTICLES
  } from "./constants"
  import axios from "axios"

  const getUrl = (searchTerm, sortBy, country = 'us') => {
    if(searchTerm)
      return process.env.REACT_APP_SEARCH_ARTICLES_URL + searchTerm + '&sortBy=' + sortBy
    
    return process.env.REACT_APP_TOP_ARTICLES_URL + country

  }

  export const fetchArticles = (searchTerm, sortBy, country) => {
    const url = getUrl(searchTerm, sortBy, country)
    return async dispatch => {
      try {
        const response = await axios.get(url)
         dispatch({
                    type: FETCH_ARTICLES,
                    payload: response.data
                  })
      }
      catch(error) {
        console.log(error)
        alert('Error Happened While Fetching Movies')
      }
    }
  }
  export const fetchMoreArticles = (searchTerm, sortBy, country, page) => {
    const url = getUrl(searchTerm, sortBy, country) + '&page=' + page
    return async dispatch => {
      try {
        const response = await axios.get(url)
         dispatch({
                    type: FETCH_MORE_ARTICLES,
                    payload: response.data
                  })
      }
      catch(error) {
        console.log(error)
        alert('Error Happened While Fetching Movies')
      }
    }
  }
  export const setSearchTerm = searchTerm => {
    return {
      type: SET_SEARCH_TERM,
      payload: searchTerm,
    }
  }
  export const setCountry = country => {
    return {
      type: SET_COUNTRY,
      payload: country,
    }
  }
  
  
  export const setSortBy = sortBy => {
    return {
      type: SET_SORT_BY,
      payload: sortBy,
    }
  }