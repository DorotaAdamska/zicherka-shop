import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Products from '../../features/Products/ProductsContainer';
import SideBar from '../../features/SideBar/SideBar'


const HomePage = () => (
  <div>
    <Container>
        <Row>
            <Col xs={3}>
                <SideBar />
            </Col>
            <Col xs={9}>
            <Products />
            </Col>
        </Row>
    </Container>
  </div>
);

export default HomePage;