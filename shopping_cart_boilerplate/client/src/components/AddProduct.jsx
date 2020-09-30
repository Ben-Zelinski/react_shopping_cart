import React from "react";

class AddProduct extends React.Component {
  state = {
    productTitle: "",
    productPrice: 0,
    productQuantity: 0,
    addMode: false,
  };

  updateState = (e) => {
    const tempState = Object.assign({}, this.state);
    tempState[e.target.id] = e.target.value;
    this.setState(tempState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.productTitle,
      price: this.state.productPrice,
      quantity: this.state.productQuantity,
    };

    this.props.onSubmitClick(data);
    this.toggleAddMode();
    this.resetState();
  };

  resetState = () => {
    this.setState({ productTitle: "", productPrice: 0, productQuantity: 0 });
  };

  toggleAddMode = () => {
    this.setState({ addMode: !this.state.addMode });
  };

  render() {
    return (
      <div className={this.state.addMode ? "add-form visible" : "add-form"}>
        <p>
          <a className="button add-product-button" onClick={this.toggleAddMode}>
            Add A Product
          </a>
        </p>
        <h3>Add Product</h3>
        <form>
          <div class="input-group">
            <label for="product-name">Product Name</label>
            <input
              type="text"
              id="productTitle"
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
            <a class="button" onClick={this.handleSubmit}>
              Add
            </a>
            <a class="button" onClick={this.toggleAddMode}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
