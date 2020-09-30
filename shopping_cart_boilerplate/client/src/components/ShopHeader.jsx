import React from "react";

const ShopHeader = ({ cart, onCheckoutClick, isCartEmpty }) => {
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
          {Object.keys(cart.products).map((id) => {
            const product = cart.products[id];
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
              Total: ${cart.total}
            </td>
          </tr>
        </table>
        <a
          className={
            isCartEmpty() ? "button checkout disabled" : "button checkout"
          }
          onClick={onCheckoutClick}
        >
          Checkout
        </a>
      </div>
    </header>
  );
};

export default ShopHeader;
