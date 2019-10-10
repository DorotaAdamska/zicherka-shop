import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';

class CartList extends React.Component {

  productAdd = (id) => {
    const { addProductToCart } = this.props;
    addProductToCart(id);
  }

  productRemove = (id) => {
    const { removeProductFromCart } = this.props;
    removeProductFromCart(id);
  }


  render() {
    const { products, edit } = this.props;

    return (
      <tbody>
        {products.map((item, index) => <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{item.product.name}</td>
          <td className="text-right">{item.product.price}</td>
          <td>
            {edit ? <Button onClick={() => this.productRemove(item.product.id)} size="sm">-</Button> : ``}
            <span className="px-2">{item.quantity}</span>
            {edit ? <Button onClick={() => this.productAdd(item.product.id)} size="sm">+</Button> : ``}
          </td>
          <td className="text-right">{Math.round(parseFloat(item.quantity) * parseFloat(item.product.price) * 100) / 100}</td>
        </tr>)}
      </tbody>
    );
  }
}

CartList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.object.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default CartList;