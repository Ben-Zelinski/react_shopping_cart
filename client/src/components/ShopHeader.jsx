import React from "react";

const ShopHeader = (props) => {
  const onCheckoutClick = () => {
    props.onCheckout();
  };

  const isCartEmpty = () => {
    return Object.keys(props.cartProducts).length === 0;
  };

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
          {Object.keys(props.cartProducts).map((id) => {
            const product = props.cartProducts[id];
            return (
              <tr key={id}>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
              </tr>
            );
          })}
          <tr>
            <td colspan="3" class="total">
              Total: $
              {Object.keys(props.cartProducts).reduce(
                (acc, id) =>
                  acc +
                  props.cartProducts[id].quantity *
                    props.cartProducts[id].price,
                0
              )}
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
