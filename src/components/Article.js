import React from 'react'
import { Container, Card, Figure, ListGroup, Row, Col } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { dummyText } from '../utils/constants'
import { authorSvg, dateSvg, sourceSvg } from '../utils/svgIcons'
import useArticle from './hooks/useArticle'
import SideCard from './SideCard'

const Article = (props) => {
    if(!props.location || !props.location.state)
        return <Redirect to="/"/>
    const { title, source, author, description, urlToImage, publishedAt, content, url } = props.location.state
    const { sideArticles, datePublishedAt, sourceName } = useArticle({ title, publishedAt, source })
    return (
    <Container fluid >
        <Row>
            <Col sm={12} md={12} lg={9}>
                <Container>
                    <Card className="article-card">
                        <h1 className="display-5">{title}</h1>
                        <Card.Body>
                            <ListGroup horizontal="sm">
                                <ListGroup.Item variant="dark">{authorSvg()} Author: {author ? author:'Not Listed'}</ListGroup.Item>
                                <ListGroup.Item variant="dark">{sourceSvg()} Source: {sourceName}</ListGroup.Item>
                                <ListGroup.Item variant="dark">{dateSvg()} Published At: {datePublishedAt}</ListGroup.Item>
                            </ListGroup>
                            <hr/>
                            <Card.Subtitle className="display-5">{description}</Card.Subtitle>
                            <hr/>
                            <Container>
                                <Figure>
                                    <Figure.Image 
                                    alt="article-image"
                                    style={{ float:"left", margin:"10px", maxHeight:"800px"}}
                                    src={urlToImage} width="100%"
                                    />
                                    {urlToImage&&
                                        <Figure.Caption>Nulla vitae elit libero, a pharetra augue mollis interdum.</Figure.Caption>
                                    }
                                </Figure>
                                
                                {content ? 
                                    <Card.Text align="justify" className="content-paragraph">{content}{dummyText}</Card.Text>
                                    : 
                                    <Card.Text>Content Not Provided. Click <Link className='link' to="/">here</Link> to go to front page</Card.Text>
                                }
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Row style={{marginTop:"10px"}}>
                                <Col>
                                    <ListGroup  horizontal>
                                        <ListGroup.Item variant="light" ><Link className='link' to="/">Home Page</Link></ListGroup.Item>
                                    </ListGroup> 
                                </Col>
                                <Col  bsPrefix="justify"> 
                                    <ListGroup  horizontal style={{width:"fit-content"}}>
                                        <ListGroup.Item variant="light"><a className='link' href={url} target="_blank" rel="noopener noreferrer" >Visit Source Website</a></ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card> 
                </Container>
            </Col>
            <Col lg={3} className="d-none d-lg-block">
                <Container>
                <h3 >Related Articles</h3>
                    { sideArticles.map(article => <SideCard key={article.title + Math.random()} article={article} />)}
                </Container>
            </Col>
        </Row>  
    </Container>
    )
}

export default Article
