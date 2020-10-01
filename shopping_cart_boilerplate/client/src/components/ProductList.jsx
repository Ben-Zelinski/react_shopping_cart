import React from "react";
import Product from "./Product";
import store from "../lib/store";

class ProductList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });

    fetch("http://localhost:5000/api/products").then((products) => {
      products.json().then((data) => {
        store.dispatch({
          type: "PRODUCTS_RECEIVED",
          payload: {
            products: data,
          },
        });
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div class="product-listing">
        <h2>Products</h2>
        {store.getState().products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductList;
