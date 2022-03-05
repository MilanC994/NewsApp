import { useDispatch, useSelector } from 'react-redux'
import { useState, useCallback, useMemo } from 'react'
import _ from 'lodash'
import { setSearchTerm, setSortBy, setCountry } from '../../redux/actions'
import { countries, searchSort } from '../../utils/constants'

const SEARCH_DEBOUNCE_TIME = 1000

const useHeader = () => {
  const searchTerm = useSelector((state) => state.articles.searchTerm)
  const [searchValue, setSearchValue] = useState(searchTerm)

  const sortBy = useSelector((state) => state.articles.sortBy)
  const byCountry = useSelector((state) => state.articles.country)

  const dispatch = useDispatch()

  const debouncedSetSearchTerm = useCallback(
    _.debounce(async (term) => {
      await dispatch(setSearchTerm(term))
    }, SEARCH_DEBOUNCE_TIME),
    [],
  )

  const changeCountry = useCallback((e) => {
    dispatch(setCountry(e.target.value))
  }, [])

  const changeSearchTerm = useCallback((e) => {
    setSearchValue(e.target.value)
    debouncedSetSearchTerm(e.target.value)
  }, [])

  const changeSortBy = useCallback((e) => {
    dispatch(setSortBy(e.target.value))
  }, [])

  const search = useMemo(
    () => ({ value: searchValue, onChange: changeSearchTerm }),
    [searchValue, changeSearchTerm]
  )

  const sort = useMemo(() => ({ value: sortBy, onChange: changeSortBy }), [sortBy, changeSortBy])

  const country = useMemo(
    () => ({ value: byCountry, onChange: changeCountry }),
    [byCountry, changeCountry]
  )

  const selectList = useMemo(() => (searchTerm.length === 0
    ? { item: country, options: countries }
    : { item: sort, options: searchSort }), [searchTerm, country, sort])

  return { search, selectList }
}

export default useHeader
