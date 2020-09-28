import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const Products = ({ products }) => {
  return (
    <main>
      <ProductList products={products} />
      <AddProduct />
    </main>
  );
};

export default Products;
