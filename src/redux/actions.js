import {
    FETCH_ARTICLES,
    SET_SEARCH_TERM,
    SET_SORT_BY
  } from "./constants"
  import axios from "axios"

  const getUrl = (searchTerm, sortBy) => {
    if(searchTerm){
      const url = process.env.REACT_APP_SEARCH_ARTICLES_URL + searchTerm
      return sortBy ? url + '&sortBy=' + sortBy : url
    }
    return process.env.REACT_APP_TOP_ARTICLES_URL

  }

  export const fetchArticles = (searchTerm, sortBy) => {
    console.log("U Fetch Articles st:", searchTerm,"  sort:  ", sortBy)
    const url = getUrl(searchTerm, sortBy)
    console.log("Dobijeni URL", url)
    return async dispatch => {
      try {
        const response = await axios.get(url)
        console.log(response, "RESP DATA")
         dispatch({
                    type: FETCH_ARTICLES,
                    payload: response.data.articles
                  })
      }
      catch(error) {
        console.log(error, "LOGGED ERROR")
      }
    }
  }
  export const setSearchTerm = searchTerm => {
    return {
      type: SET_SEARCH_TERM,
      payload: searchTerm,
    }
  }
  
  
  export const setSortBy = sortBy => {
    return {
      type: SET_SORT_BY,
      payload: sortBy,
    }
  }