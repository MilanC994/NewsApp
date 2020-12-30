import React from 'react'
import { Container, Image, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const Article = (props) => {
    if(!props.location.state)
        return <Redirect to="/"/>
    const { title, source, author, description, urlToImage, publishedAt, content } = props.location.state
    return (
        <Container>
        <Card>
            {urlToImage &&<Card.Img variant="top" src={urlToImage} />}
            <Card.Body>
            <Card.Title className="display-1">{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
            <Card.Text>{content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                Source: {source.name} Author: {author} Published At: {publishedAt}
            </Card.Footer>
        </Card>
        </Container>
    )
}

export default Article
