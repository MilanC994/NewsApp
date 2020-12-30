import React from 'react'
import ArticleCard from './ArticleCard'
import { CardColumns, Button } from 'react-bootstrap'
import useArticlesContainer from './hooks/useArticlesContainer'

const ArticlesContainer = () => {
    const { articles } = useArticlesContainer()
    console.log("Clanci", articles)
    return (
        <CardColumns>
            {
                articles && articles.map(article => <ArticleCard key={article.url} {...article} />)
            }
        </CardColumns>
    )
}

export default ArticlesContainer
