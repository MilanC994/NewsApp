import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import { ARTICLE_HAS_NO_TITLE } from '../utils/constants'

const ArticleCard = ({ title, description, urlToImage, author, content, publishedAt, source, url }) => {
    const linkTo = title ? `/article/${slugify(title)}` : `/article/${slugify(ARTICLE_HAS_NO_TITLE) + Math.random()}`
    return (
        <Card className="article-card">
            {urlToImage &&<Card.Img className="card-image" alt="article-image" variant="top" src={urlToImage} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link to={{
                pathname: linkTo,
                state: {
                    title,
                    description,
                    urlToImage,
                    author,
                    content,
                    publishedAt,
                    source,
                    url
                }
                }}>
                    <Button variant="primary">Read Full Article</Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}

export default ArticleCard
