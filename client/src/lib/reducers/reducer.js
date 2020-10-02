import { combineReducers } from "redux";

const products = (state = [], action) => {
  switch (action.type) {
    case "PRODUCTS_RECEIVED":
      return [...state, ...action.payload.products];
    case "PRODUCT_ADDED":
      return [...state, action.payload.product];
    case "PRODUCT_EDITED":
      return state.map((oldProd) => {
        if (oldProd._id === action.payload.product._id) {
          return Object.assign({}, action.payload.product);
        } else {
          return oldProd;
        }
      });
    case "PRODUCT_DELETED":
      return state.filter((product) => product._id !== action.payload.id);
  }
  return state;
};

const cartProducts = (state = {}, action) => {
  switch (action.type) {
    case "ADDED_TO_CART": {
      const product = action.payload.product;
      const currProds = Object.assign({}, state);

      if (currProds[product._id]) {
        currProds[product._id] = Object.assign({}, currProds[product._id]);
        currProds[product._id].quantity += 1;
      } else {
        currProds[product._id] = {
          title: product.title,
          quantity: 1,
          price: product.price,
        };
      }

      return currProds;
    }
    case "PRODUCT_EDITED": {
      const currProds = Object.assign({}, state);
      const newProd = action.payload.product;

      if (currProds[newProd._id]) {
        currProds[newProd._id] = Object.assign({}, currProds[newProd._id]);
        currProds[newProd._id].title = newProd.title;
        currProds[newProd._id].price = newProd.price;
      } else {
        return;
      }

      return currProds;
    }
    case "PRODUCT_DELETED":
      const remainingProds = Object.assign({}, state);

      delete remainingProds[action.payload.id];
      return remainingProds;
    case "CHECKOUT":
      return {};
  }

  return state;
};

const reducer = combineReducers({
  products,
  cartProducts,
});

export default reducer;
