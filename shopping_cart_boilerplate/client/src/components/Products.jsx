import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const Products = ({ products, onCartAdd, onSubmitClick }) => {
  return (
    <main>
      <ProductList products={products} onCartAdd={onCartAdd} />
      <AddProduct onSubmitClick={onSubmitClick} />
    </main>
  );
};

export default Products;
