import React from "react";
import Product from "./Product";
import store from "../lib/store";

const ProductList = () => {
  return (
    <div class="product-listing">
      <h2>Products</h2>
      {store.getState().products.map((product) => (
        <Product
          key={product._id}
          product={product}
          onCartAdd={this.props.onCartAdd}
          onEditProduct={this.props.onEditProduct}
          onProductDelete={this.props.onProductDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
