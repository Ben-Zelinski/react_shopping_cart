import React from "react";
import Product from "./Product";

const ProductList = ({
  products,
  onCartAdd,
  onEditProduct,
  onProductDelete,
}) => {
  return (
    <div class="product-listing">
      <h2>Products</h2>
      {products.map((product) => (
        <Product
          key={product._id}
          product={product}
          onCartAdd={onCartAdd}
          onEditProduct={onEditProduct}
          onProductDelete={onProductDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
