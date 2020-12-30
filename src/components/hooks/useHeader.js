import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useMemo } from 'react'
import {  setSearchTerm, setSortBy } from "../../redux/actions"
import _ from 'lodash'

const SEARCH_DEBOUNCE_TIME = 5000

const useHeader = () => {

  const selectSearchTerm = state => state.searchTerm 
  const searchTerm = useSelector(selectSearchTerm)

  const [searchValue, setSearchValue] = useState(searchTerm)
  
  const selectSortBy = state => state.sortBy
  const sortBy = useSelector(selectSortBy)

  const dispatch = useDispatch()

    const debouncedSetSearchTerm =useCallback( _.debounce(async( searchTerm )=>{
        await dispatch(setSearchTerm(searchTerm))
      },SEARCH_DEBOUNCE_TIME),[])
 
    // const changeSearchTerm = useCallback((e) => {
    //     console.log("Value prije :",e.target.value)
    //     setSearchValue(e.target.value)
    //     debouncedSetSearchTerm(e.target.value)
    //     console.log("posle svega")       
    // },[setSearchValue, debouncedSetSearchTerm])
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

    const sort = useMemo(() => {
        return { value: sortBy, onClick: changeSortBy }
    }, [sortBy, changeSortBy])
    
  return { search, sort }
}

export default useHeader