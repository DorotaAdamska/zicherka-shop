import React from 'react';
import { PropTypes } from 'prop-types';
import { Alert, Row, Col, Table, Button, Input } from 'reactstrap';
import CartList from './CartList';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      discountCode: props.cart.discountCode || '',
      showDiscountForm: false,
      showOrderConfirmation: false
    }
  }

  componentWillUnmount() {
    const { showOrderConfirmation } = this.state;

    if (showOrderConfirmation) {
      this.setState({ showOrderConfirmation: false });
    }
  }

  handleChangeDiscountCode = (e) => {
    this.setState({ discountCode: e.target.value });
  }

  handleDiscountCodeForm = (e) => {
    this.setState({ showDiscountForm: true });
  }

  handleAddDiscountCode = () => {
    const { addDiscountCode } = this.props;
    const { discountCode } = this.state;
    this.setState({
      showDiscountForm: false
    });

    addDiscountCode(discountCode);
  }

  handleRemoveDiscountCode = () => {
    const { addDiscountCode } = this.props;

    this.setState({
      discountCode: ''
    });

    addDiscountCode('');
  }

  handleOrderConfirmation = () => {
    this.setState({
      showOrderConfirmation: true
    });
  }

  render() {
    const { products, cart, addProductToCart, removeProductFromCart } = this.props;
    const { showDiscountForm, discountCode, showOrderConfirmation } = this.state;

    let content = '';
    if (products.length === 0) {
      content = <Alert color="info">Koszyk jest pusty</Alert>;
    }
    else {
      let discountText = 'Brak';
      let discountButton = !showOrderConfirmation ? <Button onClick={(e) => this.handleDiscountCodeForm(e)} size="sm">+</Button> : ``;
      let discountShortcut = '';

      if (showDiscountForm) {
        discountText = 
        <Input
          type="text"
          name="discountCode"
          id="discountCode"
          placeholder="Wprowadź kod"
          bsSize="sm"
          className="discount"
          onChange={(e) => this.handleChangeDiscountCode(e)}
          value={discountCode}
        />
        discountButton = <Button onClick={() => this.handleAddDiscountCode()} size="sm">ZATWIERDŹ</Button>;
      }
      else {
        if (cart.discountCode && cart.discount > 0) {
          discountText = cart.discountAmount;
          discountButton = !showOrderConfirmation ? <Button onClick={() => this.handleRemoveDiscountCode()} size="sm" color="danger" title="Usuń kod rabatowy">×</Button> : ``;
          discountShortcut = ` (${cart.discountCode} - ${cart.discount}%)`;
        }
        else {
          if (cart.discountCode && cart.discount === 0) {
            discountText = 'Nieprawidłowy kod';
          }
        }
      }

      content = <div className="cart">
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Lp.</th>
                  <th className="text-left">Produkt</th>
                  <th className="text-right">Cena</th>
                  <th className="text-left">Ilość</th>
                  <th className="text-right">Wartość</th>
                  <th></th>
                </tr>
              </thead>
              <CartList
                products={products}
                addProductToCart={addProductToCart}
                removeProductFromCart={removeProductFromCart}
                edit={!showOrderConfirmation}
              />
              <tbody>
                <tr>
                  <td colSpan="4" className="text-right">RAZEM:</td>
                  <td className="text-right">{cart.total}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-right">
                    KOD RABATOWY
                    {discountShortcut}
                    :
                  </td>
                  <td className="text-right">
                    {discountText}
                  </td>
                  <td className="text-right">
                    {discountButton}
                  </td>
                </tr>
                <tr className='cart-summary'>
                  <td colSpan="4" className="text-right">DO ZAPŁATY:</td>
                  <td className="text-right">{cart.total + cart.discountAmount}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            {showOrderConfirmation ?
              <Alert className='alert-info' color="info">Twoje zamówienie zostało przekazane do realizacji</Alert> :
              <div className="text-right">
                <Button onClick={() => this.handleOrderConfirmation()} size="lg">ZAPŁAĆ</Button>
              </div>
            }
          </Col>
        </Row>
      </div>
    }

    return (
      <div>
        {content}
      </div>
    );
  }

};

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  total: PropTypes.number,
};

export default Cart;