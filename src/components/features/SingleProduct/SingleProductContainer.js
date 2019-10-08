import { connect } from 'react-redux';
import { getSingleProduct, getRequest, resetRequest, loadSingleProductRequest } from '../../../redux/productsRedux';
//import { insertProduct } from '../../../redux/cartRedux';
import SingleProduct from './SingleProduct';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  singleProduct: getSingleProduct(state),
  request: getRequest(state)
})

const mapDispatchToProps = dispatch => ({
  loadSingleProduct: (id) => dispatch(loadSingleProductRequest(id)),
  resetRequest: () => dispatch(resetRequest()),
 // addProductToCart: (id) => dispatch(insertProduct(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
