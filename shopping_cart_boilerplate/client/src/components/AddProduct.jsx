import React from "react";

class AddProduct extends React.Component {
  state = {
    productName: "",
    productPrice: 0,
    productQuantity: 0,
  };

  updateState = (e) => {
    const tempState = Object.assign({}, this.state);
    tempState[e.target.id] = e.target.value;
    this.setState(tempState);
  };

  render() {
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
              value={this.state.price}
            />
          </div>

          <div class="input-group">
            <label for="product-quantity">Quantity</label>
            <input
              type="text"
              id="productQuantity"
              onChange={this.updateState}
              value={this.state.quantity}
            />
          </div>

          <div class="actions form-actions">
            <a class="button">Add</a>
            <a class="button">Cancel</a>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
