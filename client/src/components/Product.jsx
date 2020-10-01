import React from "react";
import EditProduct from "./EditProduct";
import store from "../lib/store";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  handleAddToCartClick = (e) => {
    e.preventDefault();
    const product = this.props.product;
    const currProds = Object.assign({}, store.getState().cartProducts);

    if (currProds[product._id]) {
      currProds[product._id] = Object.assign({}, currProds[product._id]);
      currProds[product._id].quantity += 1;
    } else {
      currProds[product._id] = {
        title: product.title,
        quantity: 1,
        price: product.price,
      };
    }

    store.dispatch({
      type: "ADDED_TO_CART",
      payload: {
        currProds,
        sum: product.price,
      },
    });
  };

  handleEditClick = () => {
    this.setState({ editMode: true });
  };

  handleCancelClick = () => {
    this.setState({ editMode: false });
  };

  deleteFromCart = (id) => {
    if (!store.getState().cartProducts[id]) return;
    const currProds = Object.assign({}, store.getState().cartProducts);
    const quantity = currProds[id].quantity;
    const price = currProds[id].price;
    delete currProds[id];

    store.dispatch({
      type: "CART_PRODUCT_DELETED",
      payload: {
        currProds,
        change: quantity * price,
      },
    });
  };
  handleProductDelete = () => {
    const data = {
      method: "DELETE",
      body: JSON.stringify(this.props.product),
      headers: { "content-type": "application/json" },
    };

    fetch(
      `http://localhost:5000/api/products/${this.props.product._id}`,
      data
    ).then(() => {
      const remainingProducts = store.getState().products.filter((oldProd) => {
        if (oldProd._id !== this.props.product._id) {
          return oldProd;
        }
      });

      this.deleteFromCart(this.props.product._id);

      store.dispatch({
        type: "PRODUCT_DELETED",
        payload: {
          remainingProducts,
        },
      });
    });
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
