
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
    console.log(page,"PAGE IZ USECONTAINERA")
    await dispatch(fetchMoreArticles(searchTerm, sortBy, country, page + 1))
    },[searchTerm, sortBy, country, page])

    const renderLoadMoreButton = useMemo(() => {
        console.log(totalResults > articles.length && articles.length < 100, "USLOV ZA RENDER, LENT", articles.length)
        return totalResults > articles.length && articles.length < 100 
    },[totalResults, articles])
    console.log(page,"PEEJJJJJJJSZ")
    useEffect(() => {
        const fetch = async () => {
        await getData()
        }
        fetch()
    },[getData])

    return { articles, getMoreData, renderLoadMoreButton }
}

export default useContentContainer