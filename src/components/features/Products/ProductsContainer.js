import { connect } from 'react-redux';
import { getProducts, getRequest, resetRequest, loadProductsRequest } from '../../../redux/productsRedux';
import Products from './Products';

const mapStateToProps = state => ({
  products: getProducts(state),
  request: getRequest(state),
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsRequest()),
  resetRequest: () => dispatch(resetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);