import React from 'react'
import ArticleCard from './ArticleCard'
import { CardColumns, Button, Container } from 'react-bootstrap'
import useArticlesContainer from './hooks/useArticlesContainer'

const ArticlesContainer = () => {
  const { articles, getMoreData, renderLoadMoreButton } = useArticlesContainer()
  return (
    <>
      <CardColumns id="articles-container">
        {articles &&
          articles.map(article => (
            <ArticleCard key={article.url + Math.random()} {...article} />
          ))}
      </CardColumns>
      <hr />
      {renderLoadMoreButton && (
        <Container>
          <Button
            variant="primary"
            id="load-more-articles-button"
            onClick={getMoreData}
          >
            LOAD MORE
          </Button>
        </Container>
      )}
    </>
  )
}

export default ArticlesContainer
