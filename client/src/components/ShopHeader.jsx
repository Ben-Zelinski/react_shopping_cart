import React from "react";
import store from "../lib/store";

class ShopHeader extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCheckoutClick() {
    store.dispatch({
      type: "CHECKOUT",
      payload: {},
    });
  }

  isCartEmpty() {
    return Object.keys(store.getState().cartProducts).length === 0;
  }

  render() {
    return (
      <header>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <table className="cart-items">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {Object.keys(store.getState().cartProducts).map((id) => {
              const product = store.getState().cartProducts[id];
              return (
                <tr key={id}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
            <tr>
              <td colspan="3" class="total">
                Total: ${store.getState().cartTotal}
              </td>
            </tr>
          </table>
          <a
            className={
              this.isCartEmpty()
                ? "button checkout disabled"
                : "button checkout"
            }
            onClick={this.onCheckoutClick}
          >
            Checkout
          </a>
        </div>
      </header>
    );
  }
}

export default ShopHeader;
