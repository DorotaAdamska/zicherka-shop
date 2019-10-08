import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import './ProductSummary.scss';
import { Link } from 'react-router-dom';


const ProductSummary = ({ name, price, additionalInfo, image, currency, id}) => (
    <div className={'product-summary'}>
        <Card>
            <CardBody>
            <CardText>{additionalInfo}</CardText>
            </CardBody>
            <CardImg src={image}/>
            <CardBody>   
                <CardTitle>{name}</CardTitle>
                <CardText>{price} {currency}</CardText>
                <Button variant="primary"><Link to={`/product/${id}`}>Read more</Link></Button>

            </CardBody>
        </Card>
    </div>
);

ProductSummary.propTypes = {
    id: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired
};

export default ProductSummary;