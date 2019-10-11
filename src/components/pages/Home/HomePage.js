import React from 'react';
import { Row, Col } from 'reactstrap';
import Products from '../../features/Products/ProductsContainer';
import SideBar from '../../features/SideBar/SideBar'
//import './HomePage.scss'


const HomePage = () => (
    <div className='home-page'>
        <Row>
            <Col xs={3}>
                <SideBar />
            </Col>
            <Col xs={9}>
                <Products />
            </Col>
        </Row>
    </div>
);

export default HomePage;