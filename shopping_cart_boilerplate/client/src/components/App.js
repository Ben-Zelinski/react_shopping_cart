import React from "react";
import ShopHeader from "./ShopHeader";
import Products from "./Products";

class App extends React.Component {
  state = {
    products: [],
    cart: { products: {}, total: 0 },
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/products").then((products) => {
      products.json().then((data) => {
        this.setState({ products: data });
      });
    });
  }

  onCartAdd(product) {
    this.updateCart(product);
  }

  onEditProduct(product) {
    const data = {
      method: "PUT",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    };
    fetch(`http://localhost:5000/api/products/${product._id}`, data).then((product) => {
      product.json().then((prod) => {
        const newProducts = this.state.products.map((oldProd) => {
          if (oldProd._id === prod._id) {
            return Object.assign({}, prod);
          } else {
            return oldProd;
          }
        });
        this.setState({ products: newProducts });
      });
    });
       
  }

  onSubmitClick(product) {
    const data = {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    };
    fetch("http://localhost:5000/api/products", data).then((product) => {
      product.json().then((prod) => {
        this.setState({ products: this.state.products.concat(prod) });
        console.log(this.state);
      });
    });
  }

  updateCart(product) {
    const currCart = Object.assign({}, this.state.cart);
    const currProds = Object.assign({}, currCart.products);

    if (currProds[product._id]) {
      currProds[product._id] = Object.assign({}, currProds[product._id]);
      currProds[product._id].quantity += 1;
    } else {
      currProds[product._id] = {
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
          onEditProduct={this.onEditProduct.bind(this)}
          onSubmitClick={this.onSubmitClick.bind(this)}
        />
      </div>
    );
  }
}

export default App;
