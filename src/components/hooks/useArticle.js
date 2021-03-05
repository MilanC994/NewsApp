
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useMemo } from 'react'
import {  fetchArticles } from "../../redux/actions"
import moment from 'moment'


const useArticle = ({ title, publishedAt, source }) => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()

    const getData = useCallback(async() => {
        await dispatch(fetchArticles())
    },[])
    
    useEffect(() => {
        if(!articles || articles.length === 0){    
            const fetch = async () => {
            await getData()
            }
            fetch()
        }
    },[])
    const datePublishedAt = useMemo(() => publishedAt ? moment(publishedAt).format('Do MMMM YYYY HH:SS') : 'Date not provided')
    const sourceName = useMemo(() => source && source.name ? source.name : 'Source Not Provided')
    const sideArticles = useMemo(
        () => {
            if(!articles) return []
            if(articles.length > 5)
                return articles.filter(ar => ar.title != title).slice(0,5)
            return articles.filter(ar => ar.title != title)
        },
        [articles, title]
    )
    return { sideArticles, datePublishedAt, sourceName }
}

export default useArticle