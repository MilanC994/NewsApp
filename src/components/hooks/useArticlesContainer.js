import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import { fetchArticles, fetchMoreArticles } from '../../redux/actions'
import _ from 'lodash'
import { createErrorMessageSelector, createLoadingSelector } from '../../redux/selectors'

const useArticlesContainer = () => {
  const state = useSelector(state => state)
  console.log(state, " STATE")
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

  const renderLoadMoreButton = useMemo(() => {
    return totalResults > articles.length && articles.length < 100
  }, [totalResults, articles])

  useEffect(() => {
    const fetch = async () => {
      await getData()
    }
    fetch()
  }, [getData])

  const loadingUserClubsDetailsSelector = useMemo(
    () => createLoadingSelector(['GET_CLUBS_DETAILS']),
    [],
  );
  const userClubsDetailsLoading = useSelector(state =>
    loadingUserClubsDetailsSelector(state),
  );

  const userClubsDetailsErrorSelector = useMemo(
    () => createErrorMessageSelector(['GET_CLUBS_DETAILS']),
    [],
  );

  return { articles, getMoreData, renderLoadMoreButton }
}

export default useArticlesContainer
