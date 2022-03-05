import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import { fetchArticles, fetchMoreArticles } from '../../redux/actions'
import _ from 'lodash'
import { createErrorMessageSelector, createLoadingSelector } from '../../redux/selectors'
import { FETCH_ARTICLES, FETCH_MORE_ARTICLES } from '../../redux/constants'

const useArticlesContainer = () => {
  const articles = useSelector(state => state.articles.articles)
  const country = useSelector(state => state.articles.country)
  const page = useSelector(state => state.articles.page)
  const totalResults = useSelector(state => state.articles.totalResults)
  const searchTerm = useSelector(state => state.articles.searchTerm)
  const sortBy = useSelector(state => state.articles.sortBy)

  const dispatch = useDispatch()

  const getData = useCallback(async () => {
    await dispatch(fetchArticles(searchTerm, sortBy, country))
  }, [searchTerm, sortBy, country])

  const getMoreData = useCallback(async () => {
    await dispatch(fetchMoreArticles(searchTerm, sortBy, country, page + 1))
  }, [searchTerm, sortBy, country, page])

  const shouldRenderLoadMoreButton = useMemo(() => {
    return totalResults > articles.length && articles.length < 100
  }, [totalResults, articles])

  useEffect(() => {
    const fetch = async () => {
      await getData()
    }
    fetch()
  }, [getData])

  const articlesLoadingSelector = useMemo(() => createLoadingSelector([FETCH_ARTICLES]), [])
  const articlesLoading = useSelector(state => articlesLoadingSelector(state));

  const articlesErrorSelector = useMemo(() => createErrorMessageSelector([FETCH_ARTICLES]), [])
  const articlesError = useSelector(state => articlesErrorSelector(state))


  const moreArticlesLoadingSelector = useMemo(() => createLoadingSelector([FETCH_MORE_ARTICLES]), [])
  const moreArticlesLoading = useSelector(state => moreArticlesLoadingSelector(state));

  const moreArticlesErrorSelector = useMemo(() => createErrorMessageSelector([FETCH_MORE_ARTICLES]), [])
  const moreArticlesError = useSelector(state => moreArticlesErrorSelector(state))


  return { articles, getMoreData, articlesLoading, articlesError, moreArticlesLoading, moreArticlesError, shouldRenderLoadMoreButton }
}

export default useArticlesContainer
