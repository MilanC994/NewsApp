import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArticleCard = ({ title, description, urlToImage, author, content, publishedAt, source }) => {
    return (
        <Card>
            {urlToImage &&<Card.Img variant="top" src={urlToImage} />}
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Link to={{
             pathname: '/article',
             state: {
                title,
                description,
                urlToImage,
                author,
                content,
                publishedAt,
                source
             }
            }}>
             <Button variant="primary">Read Full Article</Button>
            </Link>
            </Card.Footer>
        </Card>
    )
}

export default ArticleCard
