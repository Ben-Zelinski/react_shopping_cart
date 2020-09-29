import React from "react";
import ShopHeader from "./ShopHeader";
import Products from "./Products";
import Data from "../lib/data";

class App extends React.Component {
  state = {
    products: [],
    cart: { products: {}, total: 0 },
  };

  componentDidMount() {
    this.setState({ products: Data });
  }

  // componentDidMount() {
  //   fetch("http://localhost:5000/api/products").then((products) => {
  //     console.log(products);
  //     const data = JSON.parse(products);
  //     this.setState({ products: data });
  //   });
  // }

  onCartAdd(product) {
    this.updateCart(product);
  }

  updateCart(product) {
    const currCart = Object.assign({}, this.state.cart);
    const currProds = Object.assign({}, currCart.products);

    if (currProds[product.id]) {
      currProds[product.id] = Object.assign({}, currProds[product.id]);
      currProds[product.id].quantity += 1;
    } else {
      currProds[product.id] = {
        title: product.title,
        quantity: 1,
        total: product.price,
      };
    }

    currCart.total += product.price;
    currCart.products = currProds;
    this.setState({ cart: currCart });
  }

  render() {
    return (
      <div id="app">
        <ShopHeader cart={this.state.cart} />
        <Products
          products={this.state.products}
          onCartAdd={this.onCartAdd.bind(this)}
        />
      </div>
    );
  }
}

export default App;
