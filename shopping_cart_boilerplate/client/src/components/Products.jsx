import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const Products = ({
  products,
  onCartAdd,
  onSubmitClick,
  onEditProduct,
  onProductDelete,
}) => {
  return (
    <main>
      <ProductList
        products={products}
        onCartAdd={onCartAdd}
        onEditProduct={onEditProduct}
        onProductDelete={onProductDelete}
      />
      <AddProduct onSubmitClick={onSubmitClick} />
    </main>
  );
};

export default Products;
