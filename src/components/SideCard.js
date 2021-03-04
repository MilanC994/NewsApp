import React from 'react'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import { ARTICLE_HAS_NO_TITLE } from '../utils/constants'

const SideCard = ({article}) => {
    const { title, urlToImage, publishedAt, ...data } = article
    const datePublishedAt = publishedAt ? moment(publishedAt).fromNow() : 'Date not provided'
    const linkTo = title ? `/article/${slugify(title)}` : `/article/${slugify(ARTICLE_HAS_NO_TITLE)}`
    return (
        <Link to={{
            pathname: linkTo,
            state: {
                title,
                urlToImage,
                urlToImage,
                ...data
                }
            }}
            >
            <Card>
                <Card.Img variant="top" src={urlToImage} />
                <Card.Body>
                    <Card.Title>{ title }</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{datePublishedAt}</small>
                </Card.Footer>
            </Card>
        </Link>
    )   
}

export default SideCard
