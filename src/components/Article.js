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

    const picSize = content ? {width:"60%", height:"50%"} :{width:"100%"}
    const datePublishedAt = publishedAt ? moment(publishedAt).format('Do MMMM YYYY HH:SS') : 'Date not provided'
    const sourceName = source && source.name ? source.name : 'Source Not Provided'
    return (
    <Container>
        <Card className="article-card">
            <h2 className="display-4">{title}</h2>
            <Card.Header><Card.Subtitle className="display-5">{description}</Card.Subtitle></Card.Header>
            <Card.Body>
                <Container>
                    <Image alt="article-image" style={{ float:"left", margin:"10px" }} src={urlToImage} {...picSize}/>
                    {content ? <Card.Text>{content}{dummyText}</Card.Text> : <Card.Text>Content Not Provided. Click <Link to="/">here</Link> to go to front page</Card.Text>}
                </Container>
                <Row style={{marginTop:"10px"}}>
                    <Col>
                        <ListGroup  horizontal>
                            <ListGroup.Item variant="light" >{authorSvg()} Author:{author ? author:'Not Listed'}</ListGroup.Item>
                        </ListGroup> 
                    </Col>
                    <Col>
                        <ListGroup  horizontal>
                            <ListGroup.Item variant="light" >{dateSvg()} Published At:{datePublishedAt}</ListGroup.Item>
                        </ListGroup>
                    </Col>
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
                            <ListGroup.Item variant="light" ><a href={url} target="_blank" rel="noopener noreferrer" >Visit Source Website</a></ListGroup.Item>
                        </ListGroup> 
                    </Col>
                    <Col style={{border:"2px solid red"}} align='right'> 
                        <ListGroup  horizontal style={{border:"2px solid green", alignContent:"right"}}>
                            <ListGroup.Item variant="light"><Link to="/">Back to front page</Link></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Footer>
        </Card> 
     </Container>
    )
}

export default Article
