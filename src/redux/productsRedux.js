import { products } from '../data/products.js';

// action name creator
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* SELECTORS */
export const getProducts = ({ products }) => products.data;
export const getRequest = ({ products }) => products.request;
export const getPages = ({ products }) => Math.ceil(products.amount / products.productsPerPage);
export const getPresentPage = ({ products }) => products.presentPage;



/* ACTIONS */
export const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const LOAD_PRODUCTS_PAGE = createActionName('LOAD_PRODUCT_PAGE');


export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });
export const loadProductsByPage = payload => ({ payload, type: LOAD_PRODUCTS_PAGE });


/* INITIAL STATE */
const initialState = {
    data: [],
    request: {
        pending: false,
        error: null,
        success: null,
    },
    amount: 0,
    productsPerPage: 6,
    presentPage: 1
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...statePart, data: action.payload };
        case LOAD_PRODUCTS_PAGE:
            return {
                ...statePart,
                productsPerPage: action.payload.productsPerPage,
                presentPage: action.payload.presentPage,
                amount: action.payload.amount,
                data: [...action.payload.data],
            };
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

/* THUNKS */
export const loadProductsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            setTimeout(() => {
                dispatch(loadProducts(products));
                dispatch(endRequest());
              }, 2000);
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
};
export const loadProductsByPageRequest = (page, productsPerPage) => {
    return async dispatch => {
  
      dispatch(startRequest());
      try {
  
        const startAt = (page - 1) * productsPerPage;
        const limit = productsPerPage;
  
        const payload = {
          data: products.slice(startAt, startAt + limit),
          amount: products.length,
          productsPerPage,
          presentPage: page,
        };
  
        setTimeout(() => {
          dispatch(loadProductsByPage(payload));
          dispatch(endRequest());
        }, 2000);

      } catch(e) {
        dispatch(errorRequest(e.message));
      }
  
    };
  };