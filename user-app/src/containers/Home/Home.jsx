import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import {Container,Row,Col} from 'react-bootstrap'
import NewTabs from '../../components/NewTabs/NewTabs'
import './_home.scss'

function Home() {
    return (
        <div>
            <Header/>
            <Container>
                <Row>
                    <Col>
                        <NewTabs/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Home