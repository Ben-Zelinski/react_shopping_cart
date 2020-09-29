import React from "react";
import Product from "./Product";

const ProductList = ({ products, onCartAdd }) => {
  return (
    <div class="product-listing">
      <h2>Products</h2>
      {products.map((product) => (
        <Product key={product._id} product={product} onCartAdd={onCartAdd} />
      ))}
    </div>
  );
};

export default ProductList;
