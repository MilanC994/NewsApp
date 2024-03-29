import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import { ARTICLE_HAS_NO_TITLE } from '../utils/constants'

function ArticleCard({
  title, description, urlToImage, ...data
}) {
  const linkTo = title
    ? `/article/${slugify(title)}`
    : `/article/${slugify(ARTICLE_HAS_NO_TITLE)}`
  return (
    <Card className="article-card mb-4">
      {urlToImage && (
        <Card.Img
          className="card-image"
          alt="article-image"
          variant="top"
          src={urlToImage}
        />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Link
          to={{
            pathname: linkTo,
            state: {
              title,
              description,
              urlToImage,
              ...data,
            },
          }}
          className="link"
        >
          <Button variant="primary">Read Full Article</Button>
        </Link>
      </Card.Footer>
    </Card>
  )
}

export default ArticleCard
