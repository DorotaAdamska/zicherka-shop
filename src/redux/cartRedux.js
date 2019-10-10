import { products } from '../data/products';
import { discounts } from '../data/discounts';

/* SELECTORS */
export const getProductsInCart = ({ cart }) => cart.products;
export const getCart = ({ cart }) => cart;

// action name creator
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTIONS */
export const ADD_PRODUCT = createActionName('ADD_PRODUCT');
export const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
export const ADD_DISCOUNT_CODE = createActionName('ADD_DISCOUNT_CODE');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');

export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const removeProduct = payload => ({ payload, type: REMOVE_PRODUCT });
export const addDiscountCode = payload => ({ payload, type: ADD_DISCOUNT_CODE });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });



/* INITIAL STATE */
const initialState = {
  products: [],
  total: 0,
  discount: 0, 
  discountAmount: 0,
  discountCode: null,
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  let productInCart;
  let newProducts;
  let newDiscountAmount;
  let newTotal;

  switch (action.type) {
    case ADD_PRODUCT:

    const product = products.find((item) => item.id === action.payload);

      //jeśli produkt jest w koszyku
      productInCart = statePart.products.find((item) => item.product.id === action.payload);
      if(productInCart) {
        const newQuantity = productInCart.quantity + 1;
        newProducts = statePart.products.map((item) => {
          if(item.product.id === productInCart.product.id) {
            item.quantity = newQuantity;
          }
          return item;
        });
        newTotal = statePart.total + productInCart.product.price;
        newDiscountAmount = -(statePart.discount / 100 * newTotal);
        return {
          ...statePart,
          products: newProducts,
          total: newTotal,
          discountAmount: newDiscountAmount
        };
      } else {
        //gdy produkt jest dodawany po raz pierwszy
        const newItem = {
          product: product,
          quantity: 1
        };
        newTotal = statePart.total + newItem.product.price;
        newDiscountAmount = -(statePart.discount / 100 * newTotal);
        return {
          ...statePart,
          products: [...statePart.products, newItem],
          total: newTotal,
          discountAmount: newDiscountAmount
        };
      }
    case REMOVE_PRODUCT:
      
      productInCart = statePart.products.find((item) => item.product.id === action.payload);
      const newQuantity = productInCart.quantity - 1;
      //gdy jest więcej niz 1 typ danego produktu w koszyku
      if(newQuantity > 0) {
        newProducts = statePart.products.map((item) => {
          if(item.product.id === productInCart.product.id) {
            item.quantity = newQuantity;
          }
          return item;
        });
      }
      else
      {
        //gdy ilość = 1 - całkowite usunięcie produktu z koszyka
        newProducts = statePart.products.filter((item) => {
          return item.product.id !== productInCart.product.id;
        });
      }
      newTotal = statePart.total - productInCart.product.price;
      newDiscountAmount = -(statePart.discount / 100 * newTotal);
      return {
        ...statePart,
        products: newProducts,
        total: newTotal,
        discountAmount: newDiscountAmount
      }
    
    case ADD_DISCOUNT_CODE:
      const newDiscountCode = action.payload !== '' ? action.payload : null;
      let newDiscount = 0;
      //czy podany kod jest prawidlowy
      const validCode = discounts.find(item => item.code === newDiscountCode);
      if(validCode) {
        newDiscount = validCode.discount;
      }
      //wyliczenie kwoty rabatu
      newDiscountAmount = -Math.round((newDiscount / 100 * statePart.total) * 100) / 100;

      return {
        ...statePart,
        discountCode: newDiscountCode,
        discount: newDiscount,
        discountAmount: newDiscountAmount
      }
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case RESET_REQUEST:
      return { ...statePart, request: initialState.request };
    default:
      return statePart;
  }
};