import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useMemo } from 'react'
import {  setSearchTerm, setSortBy, setCountry } from "../../redux/actions"
import _ from 'lodash'
import { countries, searchSort } from '../../utils/constants'

const SEARCH_DEBOUNCE_TIME = 1000

const useHeader = () => {
    const searchTerm = useSelector(state => state.searchTerm)
    const [searchValue, setSearchValue] = useState(searchTerm)

    const sortBy = useSelector(state => state.sortBy)
    const byCountry = useSelector(state => state.country)

    const dispatch = useDispatch()

    const debouncedSetSearchTerm =useCallback( _.debounce(async searchTerm => {
        await dispatch(setSearchTerm(searchTerm))
        },SEARCH_DEBOUNCE_TIME),[])

    const changeCountry = useCallback( e => {
        dispatch(setCountry(e.target.value))
    },[])

    const changeSearchTerm = useCallback( e => {
            setSearchValue(e.target.value)
            debouncedSetSearchTerm(e.target.value)
    },[])       
    

    const changeSortBy = useCallback( e => {
      dispatch(setSortBy(e.target.value))
    },[])

    const search = useMemo(() => {
        return { value: searchValue, onChange: changeSearchTerm }
    }, [searchValue, changeSearchTerm])
    
    const sort = useMemo(() => {
        return { value: sortBy, onChange: changeSortBy }
    }, [sortBy, changeSortBy])

    const country = useMemo(() => {
        return { value: byCountry, onChange: changeCountry }
    }, [byCountry, changeCountry])

    const selectList =  useMemo(() => {
        return searchTerm.length === 0 ? { item: country, options: countries } : { item: sort, options: searchSort }
    },[searchTerm, country, sort])

  return { search, selectList }
}

export default useHeader