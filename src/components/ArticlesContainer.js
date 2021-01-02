import React from 'react'
import ArticleCard from './ArticleCard'
import { CardColumns, Button, Container } from 'react-bootstrap'
import useArticlesContainer from './hooks/useArticlesContainer'

const ArticlesContainer = () => {
    const { articles, getMoreData, renderLoadMoreButton } = useArticlesContainer()
    console.log("Clanci", articles)
    return (
        <>
            <CardColumns>
                {
                    articles && articles.map(article => <ArticleCard key={article.url + Math.random()} {...article} />)
                }
            </CardColumns>
            <hr/>
            {renderLoadMoreButton&& 
                <Container>
                    <Button variant="primary" onClick={getMoreData} >LOAD MORE</Button>
                </Container>
            }
         </>   
    )
}

export default ArticlesContainer
