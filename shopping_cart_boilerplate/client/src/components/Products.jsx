import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const Products = ({ products, onCartAdd }) => {
  return (
    <main>
      <ProductList products={products} onCartAdd={onCartAdd} />
      <AddProduct />
    </main>
  );
};

export default Products;
