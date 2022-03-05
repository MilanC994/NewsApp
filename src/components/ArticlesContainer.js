import React from 'react'
import { Dots } from 'react-activity'
import { CardColumns, Button, Container } from 'react-bootstrap'
import ArticleCard from './ArticleCard'
import useArticlesContainer from './hooks/useArticlesContainer'

function Error({ message }) {
  return (
    <div className="p-3 bg-dark rounded">
      {' '}
      <h5 className="text-danger font-weight-bold">{message}</h5>
    </div>
  )
}

function ArticlesContainer() {
  const {
    articles,
    getMoreData,
    shouldRenderLoadMoreButton,
    articlesLoading,
    articlesError,
    moreArticlesLoading,
    moreArticlesError,
  } = useArticlesContainer()
  if (articlesLoading || articlesError) {
    return (
      <div className="d-flex flex-column flex-1 align-items-center justify-content-center">
        {articlesLoading && !articlesError && <Dots color="red" size={30} />}
        {articlesError && <Error message={articlesError} />}
      </div>
    )
  }

  return (
    <>
      <CardColumns id="articles-container" className="mw-100">
        {articles
          && articles.map((article) => (
            <ArticleCard key={article.url + Math.random()} {...article} />
          ))}
      </CardColumns>
      {shouldRenderLoadMoreButton && (
        <Container className="d-flex justify-content-center align-items-center flex-column">
          {moreArticlesLoading ? <Dots color="red" size={30} />
            : (
              <Button
                variant="primary"
                id="load-more-articles-button"
                className="w-25 mb-2"
                onClick={getMoreData}
              >
                LOAD MORE
              </Button>
            )}
          {moreArticlesError && <Error message={moreArticlesError} />}
        </Container>
      )}
    </>
  )
}

export default ArticlesContainer
