import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import moment from 'moment'
import { fetchArticles } from '../../redux/actions'

const useArticle = ({ title, publishedAt, source }) => {
  const articles = useSelector((state) => state.articles.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getData = useCallback(async () => {
    await dispatch(fetchArticles())
  }, [])

  useEffect(() => {
    if (!articles || articles.length === 0) {
      const fetch = async () => {
        await getData()
      }
      fetch()
    }
  }, [])
  const datePublishedAt = useMemo(
    () => (publishedAt
      ? moment(publishedAt).format('Do MMMM YYYY HH:SS')
      : 'Date not provided'),
    [publishedAt],
  )
  const sourceName = useMemo(
    () => (source && source.name ? source.name : 'Source Not Provided'),
    [source],
  )
  const sideArticles = useMemo(() => {
    if (!articles) return []
    if (articles.length > 5) return articles.filter((ar) => ar.title !== title).slice(0, 5)
    return articles.filter((ar) => ar.title !== title)
  }, [articles, title])
  return { sideArticles, datePublishedAt, sourceName }
}

export default useArticle
