import React from "react";

class EditProduct extends React.Component {
  state = {
    productName: this.props.product.title || "",
    productPrice: this.props.product.price || 0,
    productQuantity: this.props.product.quantity || 0,
  };

  updateState = (e) => {
    const tempState = Object.assign({}, this.state);
    tempState[e.target.id] = e.target.value;
    this.setState(tempState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: this.props.product._id,
      title: this.state.productName,
      price: this.state.productPrice,
      quantity: this.state.productQuantity,
    };

    console.log(data);
    this.props.onEditProduct(data);
    this.props.onCancelClick();
  };

  render() {
    return (
      <div class="add-form visible">
        <p>
          <a class="button add-product-button">Edit A Product</a>
        </p>
        <h3>Edit Product</h3>
        <form>
          <div class="input-group">
            <label for="product-name">Product Name</label>
            <input
              type="text"
              id="productName"
              onChange={this.updateState}
              value={this.state.productName}
            />
          </div>

          <div class="input-group">
            <label for="product-price">Price</label>
            <input
              type="text"
              id="productPrice"
              onChange={this.updateState}
              value={this.state.productPrice}
            />
          </div>

          <div class="input-group">
            <label for="product-quantity">Quantity</label>
            <input
              type="text"
              id="productQuantity"
              onChange={this.updateState}
              value={this.state.productQuantity}
            />
          </div>

          <div class="actions form-actions">
            <a class="button" onClick={this.handleSubmit}>
              Submit
            </a>
            <a class="button" onClick={this.props.onCancelClick}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProduct;
