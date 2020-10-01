import { combineReducers } from 'redux';

const products = (state = [], action) => {
  switch (action.type) {
    case "PRODUCTS_RECEIVED":
      return [...state, ...action.payload.products];
    case "PRODUCT_ADDED":
      return [...state, action.payload.product];
    case "PRODUCT_EDITED":
      return [...action.payload.products];
    case "PRODUCT_DELETED":
      return action.payload.remainingProducts;
  }
  return state;
};

const cartProducts = (state = {}, action) => {
  switch (action.type) {
    case "ADDED_TO_CART":
      return action.payload.currProds;
    case "CART_PRODUCT_EDITED":
      return action.payload.currProds;
    case "CART_PRODUCT_DELETED":
      return action.payload.currProds;
    case "CHECKOUT":
      return {};
  }
 
  return state;
};

const cartTotal = (state = 0, action) => {
  switch (action.type) {
    case "ADDED_TO_CART":
      return state += action.payload.sum;
    case "CART_PRODUCT_EDITED":
      return state -= action.payload.change;
    case "CART_PRODUCT_DELETED":
      return state -= action.payload.change;
    case "CHECKOUT":
      return 0;
  }
 
  return state;
};

const reducer = combineReducers({
  products,
  cartProducts,
  cartTotal,
});


export default reducer;
