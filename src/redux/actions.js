import {
  FETCH_ARTICLES,
  SET_SEARCH_TERM,
  SET_SORT_BY,
  SET_COUNTRY,
  FETCH_MORE_ARTICLES,
} from './constants'
import axios from 'axios'
const CancelToken = axios.CancelToken
let fetchArticlesCancel, fetchMoreCancel

const getUrl = (searchTerm, sortBy, country) => {
  if (searchTerm)
    return (
      process.env.REACT_APP_SEARCH_ARTICLES_URL +
      searchTerm +
      '&sortBy=' +
      sortBy
    )

  return process.env.REACT_APP_TOP_ARTICLES_URL + country
}

export const fetchArticles = (
  searchTerm,
  sortBy = 'publishedAt',
  country = 'us'
) => {
  const url = getUrl(searchTerm, sortBy, country)
  fetchArticlesCancel && fetchArticlesCancel()
  return async dispatch => {
    try {
      const response = await axios.get(url, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          fetchArticlesCancel = c
        }),
      })
      console.log('Fetched articles with', searchTerm, sortBy)
      dispatch({
        type: FETCH_ARTICLES,
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
      alert('Error Happened While Fetching Movies')
    }
  }
}
export const fetchMoreArticles = (searchTerm, sortBy, country, page) => {
  const url = getUrl(searchTerm, sortBy, country) + '&page=' + page
  fetchMoreCancel && fetchMoreCancel()
  return async dispatch => {
    try {
      const response = await axios.get(url, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          fetchMoreCancel = c
        }),
      })
      dispatch({
        type: FETCH_MORE_ARTICLES,
        payload: response.data,
      })
    } catch (error) {
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
