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

  render() {
    console.log(this.props);
    return (
      <div class="add-form visible">
        <p>
          <a class="button add-product-button">Add A Product</a>
        </p>
        <h3>Add Product</h3>
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
            <a class="button">Add</a>
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
