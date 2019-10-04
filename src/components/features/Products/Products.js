import React from 'react';
import { PropTypes } from 'prop-types';
import ProductsList from '../ProductsList/ProductsList';
import { Alert } from 'reactstrap';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { loadProducts, resetRequest } = this.props;
    resetRequest();
    loadProducts();
  }

  render() {
    const { products, request } = this.props;

    if(!request.pending && request.success && products.length > 0)
      return (
        <div>
          <ProductsList products={products} />
        </div>
      );
    if(request.pending || request.success === null)
      return (
        <div>
          spinner
        </div>
      );
    if(!request.pending && request.error !== null)
      return <Alert color="danger">{request.error}</Alert>;
    if(!request.pending && request.success && products.length === 0)
      return <Alert color="info">Brak produktów</Alert>;
  }

};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      additionalInfo: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

export default Products;