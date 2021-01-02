import React from 'react'
import { Container, Image, Card, Figure, ListGroup, Row, Col, Badge } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { dummyText } from '../utils/constants'
import { authorSvg, dateSvg, sourceSvg } from '../utils/svgIcons'
import moment from 'moment'

const Article = (props) => {
    if(!props.location.state)
        return <Redirect to="/"/>
    const { title, source, author, description, urlToImage, publishedAt, content, url } = props.location.state

    const datePublishedAt = publishedAt ? moment(publishedAt).format('Do MMMM YYYY HH:SS') : 'Date not provided'
    const sourceName = source && source.name ? source.name : 'Source Not Provided'
    return (
    <Container>
        <Card className="article-card">
            <h1 className="display-5">{title}</h1>
            <Card.Header><Card.Subtitle className="display-5">{description}</Card.Subtitle></Card.Header>
            <Card.Body>
                
                <Row style={{marginTop:"10px"}}>
                    <Col>
                        <ListGroup  horizontal>
                            <ListGroup.Item variant="light" >{authorSvg()} Author:{author ? author:'Not Listed'}</ListGroup.Item>
                        </ListGroup> 
                    </Col>
                    <Col bsPrefix="justify">
                        <ListGroup  horizontal >
                            <ListGroup.Item variant="light" >{dateSvg()} Published At:{datePublishedAt}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <hr/>
                <Container>
                    <Image alt="article-image" style={{ float:"left", margin:"10px", maxHeight:"800px"}} src={urlToImage} width="100%"/>
                    {content ? <Card.Text>{content}{dummyText}</Card.Text> : <Card.Text>Content Not Provided. Click <Link to="/">here</Link> to go to front page</Card.Text>}
                </Container>
                <hr/>
                <Row style={{marginTop:"10px"}}>
                    <Col>
                        <ListGroup  horizontal>
                            <ListGroup.Item variant="light" >{sourceSvg()} Source:{sourceName}</ListGroup.Item>
                        </ListGroup> 
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
            <Row style={{marginTop:"10px"}}>
                    <Col>
                        <ListGroup  horizontal>
                            <ListGroup.Item variant="light" ><Link to="/">Home Page</Link></ListGroup.Item>
                        </ListGroup> 
                    </Col>
                    <Col  bsPrefix="justify"> 
                        <ListGroup  horizontal style={{width:"fit-content"}}>
                            <ListGroup.Item variant="light"><a href={url} target="_blank" rel="noopener noreferrer" >Visit Source Website</a></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Footer>
        </Card> 
     </Container>
    )
}

export default Article
