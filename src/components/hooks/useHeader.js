import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useMemo } from 'react'
import {  setSearchTerm, setSortBy, setCountry } from "../../redux/actions"
import _ from 'lodash'
import { countries, searchSort } from '../../utils/constants'

const SEARCH_DEBOUNCE_TIME = 1000

const useHeader = () => {

    const selectSearchTerm = state => state.searchTerm 
    const searchTerm = useSelector(selectSearchTerm)

    const [searchValue, setSearchValue] = useState(searchTerm)
    
    const selectSortBy = state => state.sortBy
    const sortBy = useSelector(selectSortBy)
    
    const selectByCountry = state => state.country
    const byCountry = useSelector(selectByCountry)

    const dispatch = useDispatch()

    const debouncedSetSearchTerm =useCallback( _.debounce(async( searchTerm )=>{
        await dispatch(setSearchTerm(searchTerm))
        },SEARCH_DEBOUNCE_TIME),[])

    const changeCountry = useCallback((e) => {
        console.log(e.target.value, "  IZ USE CALLBACK COUNTRY")
        dispatch(setCountry(e.target.value))
    },[])

    const changeSearchTerm = e => {
        setSearchValue(e.target.value)
        debouncedSetSearchTerm(e.target.value)       
    }

    const changeSortBy = useCallback((e) => {
      dispatch(setSortBy(e.target.value))
    },[dispatch])

    const search = useMemo(() => {
        return { value: searchValue, onChange: changeSearchTerm }
    }, [searchTerm, changeSearchTerm])
    
    const renderCountries = useMemo(() => {
        return searchTerm.length === 0
    }, [searchTerm])

    const sort = useMemo(() => {
        return { value: sortBy, onChange: changeSortBy }
    }, [sortBy, changeSortBy])

    const country = useMemo(() => {
        return { value: byCountry, onChange: changeCountry }
    }, [byCountry, changeCountry])

    const selectList =  useMemo(() => {
        return renderCountries ? { item: country, options: countries } : { item: sort, options: searchSort }
    },[renderCountries, country, sort])

  return { search, selectList }
}

export default useHeader