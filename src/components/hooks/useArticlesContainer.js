
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from 'react'
import {  fetchArticles, fetchMoreArticles } from "../../redux/actions";
import _ from 'lodash'


const useContentContainer = () => {
    const selectArticles = state => state.articles
    const articles = useSelector(selectArticles)
    
    const selectCountry = state => state.country
    const country = useSelector(selectCountry)
    
    const selectPage = state => state.page
    const page = useSelector(selectPage)
    
    const selectTotalResults = state => state.totalResults
    const totalResults = useSelector(selectTotalResults)

    const selectSearchTerm = state => state.searchTerm 
    const searchTerm = useSelector(selectSearchTerm)

    const selectSortBy = state => state.sortBy
    const sortBy = useSelector(selectSortBy)

    const dispatch = useDispatch()

    const getData = useCallback(async() => {
        await dispatch(fetchArticles(searchTerm, sortBy, country))
    },[searchTerm, sortBy, country])
    
    const getMoreData = useCallback(async() => {
        await dispatch(fetchMoreArticles(searchTerm, sortBy, country, page + 1))
    },[searchTerm, sortBy, country, page])

    const renderLoadMoreButton = useMemo(() => {
        return totalResults > articles.length && articles.length < 100 
    },[totalResults, articles])

    useEffect(() => {
        const fetch = async () => {
        await getData()
        }
        fetch()
    },[getData])

    return { articles, getMoreData, renderLoadMoreButton }
}

export default useContentContainer