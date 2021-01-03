
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from 'react'
import {  fetchArticles, fetchMoreArticles } from "../../redux/actions";
import _ from 'lodash'


const useContentContainer = () => {
    const articles = useSelector(state => state.articles)
    const country = useSelector(state => state.country)
    const page = useSelector(state => state.page)
    const totalResults = useSelector(state => state.totalResults)
    const searchTerm = useSelector(state => state.searchTerm)
    const sortBy = useSelector(state => state.sortBy)

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