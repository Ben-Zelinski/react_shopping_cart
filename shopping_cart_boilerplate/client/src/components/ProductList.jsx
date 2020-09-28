import React from "react";
import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div class="product-listing">
      <h2>Products</h2>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default ProductList;
