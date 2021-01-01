
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from 'react'
import {  fetchArticles } from "../../redux/actions";
import _ from 'lodash'


const useContentContainer = () => {
    const selectArticles = state => state.articles
    const articles = useSelector(selectArticles)
    
    const selectCountry = state => state.country
    const country = useSelector(selectCountry)

    const selectSearchTerm = state => state.searchTerm 
    const searchTerm = useSelector(selectSearchTerm)

    const selectSortBy = state => state.sortBy
    const sortBy = useSelector(selectSortBy)

    const dispatch = useDispatch()

    const getData = useCallback(async() => {
    await dispatch(fetchArticles(searchTerm, sortBy, country))
    },[searchTerm, sortBy, country])

    useEffect(() => {
        const fetch = async () => {
        await getData()
        }
        fetch()
    },[getData])

    return { articles }
}

export default useContentContainer