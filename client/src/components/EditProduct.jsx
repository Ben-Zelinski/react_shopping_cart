import React from "react";
import store from "../lib/store";

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

  updateCartEdits = (oldProd, newProd) => {
    const currProds = Object.assign({}, store.getState().cartProducts);
    let quantity = 0;
    const oldPrice = oldProd.price;

    if (currProds[newProd._id]) {
      quantity = currProds[newProd._id].quantity;
      currProds[newProd._id].title = newProd.title;
      currProds[newProd._id].price = newProd.price;
      currProds[newProd._id] = Object.assign({}, currProds[newProd._id]);
    } else {
      return;
    }

    const change = (oldPrice - newProd.price) * quantity;

    store.dispatch({
      type: "CART_PRODUCT_EDITED",
      payload: {
        currProds,
        change,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: this.props.product._id,
      title: this.state.productName,
      price: this.state.productPrice,
      quantity: this.state.productQuantity,
    };

    const fetchObj = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    };

    fetch(
      `http://localhost:5000/api/products/${this.props.product._id}`,
      fetchObj
    ).then((product) => {
      product.json().then((prod) => {
        const newProducts = store.getState().products.map((oldProd) => {
          if (oldProd._id === prod._id) {
            this.updateCartEdits(oldProd, prod);
            return Object.assign({}, prod);
          } else {
            return oldProd;
          }
        });

        store.dispatch({
          type: "PRODUCT_EDITED",
          payload: {
            products: newProducts,
          },
        });
      });
    });
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
