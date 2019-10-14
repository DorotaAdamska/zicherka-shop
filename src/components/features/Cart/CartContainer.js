import { connect } from 'react-redux';
import { getProductsInCart, getCart, addProduct, removeProduct, addDiscountCode, } from '../../../redux/cartRedux';
import Cart from './Cart';

const mapStateToProps = state => ({
  products: getProductsInCart(state),
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  addProductToCart: (id) => dispatch(addProduct(id)),
  removeProductFromCart: (id) => dispatch(removeProduct(id)),
  addDiscountCode: (code) => dispatch(addDiscountCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
