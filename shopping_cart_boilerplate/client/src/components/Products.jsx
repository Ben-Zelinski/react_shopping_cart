import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import store from "../lib/store";

class Products extends React.Component {
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
      <main>
        <ProductList
          onCartAdd={this.props.onCartAdd}
          onEditProduct={this.props.onEditProduct}
          onProductDelete={this.props.onProductDelete}
        />
        <AddProduct onSubmitClick={this.props.onSubmitClick} />
      </main>
    );
  }
}

export default Products;
