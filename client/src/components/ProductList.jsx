import React from "react";
import ProductContainer from "./ProductContainer";

class ProductList extends React.Component {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    return (
      <div class="product-listing">
        <h2>Products</h2>
        {this.props.products.map((product) => (
          <ProductContainer key={product._id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductList;
