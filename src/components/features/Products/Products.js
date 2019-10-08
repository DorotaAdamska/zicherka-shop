import React from 'react';
import { PropTypes } from 'prop-types';
import ProductsList from '../ProductsList/ProductsList';
import { Alert } from 'reactstrap';
import Pagination from '../../common/Pagination/Pagination';
import Spinner from '../../common/Spinner/Spinner';

class Products extends React.Component {
    
    componentDidMount() {
        const { loadProductsByPage, productsPerPage, initialPage } = this.props;
        loadProductsByPage(initialPage || 1, productsPerPage);
      };
    
      
      loadProductsPage = (page) => {
        const { loadProductsByPage, productsPerPage } = this.props;
        loadProductsByPage(page, productsPerPage);
      };
    
      render() {
        let { products, request, pages, pagination, presentPage } = this.props;
        if (pagination === undefined) {
          pagination = true;
        }
    console.log(request, products)
        if (request.pending === false && request.success === true && products.length > 0) {
          return (
            <div>
              <ProductsList products={products} />
              {pagination && <Pagination pages={pages} initialPage={presentPage} onPageChange={this.loadProductsPage} />}
            </div>
          );
        }
    
        if (request.pending === true || request.success === null) {
          return (
            <div>
              <Spinner />
            </div>
          )
        }
    
        if (!request.pending && request.error !== null) {
          return (
            <div>
              <Alert variant='error' children={request.error} />
            </div>
          )
        }
    
        if (request.pending === false && request.success === true && products.length === 0) {
          return (
            <div>
              <Alert color='info' children='-- brak produktów --' />
            </div>
          )
        }
      }
    }

Products.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            additionalInfo: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            currency: PropTypes.string.isRequired
        })
    ),
    loadProductsByPage: PropTypes.func.isRequired,
  };

export default Products;