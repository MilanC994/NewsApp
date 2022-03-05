import {
  FETCH_ARTICLES_SUCCESS,
  SET_SEARCH_TERM,
  SET_SORT_BY,
  SET_COUNTRY,
  FETCH_MORE_ARTICLES_SUCCESS,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_FAILURE,
  FETCH_MORE_ARTICLES_REQUEST,
  FETCH_MORE_ARTICLES_FAILURE,
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
    dispatch({
      type: FETCH_ARTICLES_REQUEST
    })
    axios.get(url, {
      cancelToken: new CancelToken(function executor(c) {
        fetchArticlesCancel = c
      })
    }).then(({ data }) => {
      dispatch({
        type: FETCH_ARTICLES_SUCCESS,
        payload: data,
      })
    }).catch((error) => {

      dispatch({
        type: FETCH_ARTICLES_FAILURE,
        payload: error.response?.data?.message || error.message
      })
    })
  }
}

export const fetchMoreArticles = (searchTerm, sortBy, country, page) => {
  const url = getUrl(searchTerm, sortBy, country) + '&page=' + page
  fetchMoreCancel && fetchMoreCancel()
  return async dispatch => {
    dispatch({
      type: FETCH_MORE_ARTICLES_REQUEST
    })
    try {
      const response = await axios.get(url, {
        cancelToken: new CancelToken(function executor(c) {
          fetchMoreCancel = c
        }),
      })
      dispatch({
        type: FETCH_MORE_ARTICLES_SUCCESS,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_MORE_ARTICLES_FAILURE,
        payload: error.response?.data?.message || error.message
      })
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
