import React from "react";
import EditProduct from "./EditProduct";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  handleAddToCartClick = (e) => {
    e.preventDefault();
    this.props.onCartAdd(this.props.product);
  };

  handleEditClick = () => {
    this.setState({ editMode: true });
  };

  handleCancelClick = () => {
    this.setState({ editMode: false });
  };

  handleProductDelete = () => {
    this.props.onProductDelete(this.props.product);
  };

  render() {
    return (
      <div className="product">
        <div className="product-details">
          <h3>{this.props.product.title}</h3>
          <p className="price">${this.props.product.price}</p>
          <p className="quantity">
            {this.props.product.quantity} left in stock
          </p>
          {!this.state.editMode ? (
            <div className="actions product-actions">
              {this.props.product.quantity > 0 ? (
                <a
                  className="button add-to-cart"
                  onClick={this.handleAddToCartClick}
                >
                  Add to Cart
                </a>
              ) : (
                <a className="button add-to-cart disabled">Add to Cart</a>
              )}
              <a class="button edit" onClick={this.handleEditClick}>
                Edit
              </a>
            </div>
          ) : (
            <EditProduct
              product={this.props.product}
              onCancelClick={this.handleCancelClick}
              onEditProduct={this.props.onEditProduct}
            />
          )}
          <a class="delete-button" onClick={this.handleProductDelete}>
            <span>X</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
