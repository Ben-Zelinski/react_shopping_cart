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

  updateCartEdits(oldProd, newProd) {
    const currCart = Object.assign({}, this.state.cart);
    const currProds = Object.assign({}, currCart.products);
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
    currCart.total -= change;
    currCart.products = currProds;
    this.setState({ cart: currCart });
  }

  onEditProduct(product) {
    const data = {
      method: "PUT",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    };
    fetch(`http://localhost:5000/api/products/${product._id}`, data).then(
      (product) => {
        product.json().then((prod) => {
          const newProducts = this.state.products.map((oldProd) => {
            if (oldProd._id === prod._id) {
              this.updateCartEdits(oldProd, prod);
              return Object.assign({}, prod);
            } else {
              return oldProd;
            }
          });
          this.setState({ products: newProducts });
        });
      }
    );
  }

  deleteFromCart(id) {
    if (!this.state.cart.products[id]) return;
    const currCart = Object.assign({}, this.state.cart);
    const currProds = Object.assign({}, currCart.products);
    const quantity = currProds[id].quantity;
    const price = currProds[id].price;
    delete currProds[id];
    currCart.total -= quantity * price;
    currCart.products = currProds;
    this.setState({ cart: currCart });
  }

  onProductDelete(product) {
    const data = {
      method: "DELETE",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    };
    fetch(`http://localhost:5000/api/products/${product._id}`, data).then(
      () => {
        const remainingProducts = this.state.products.filter((oldProd) => {
          if (oldProd._id !== product._id) {
            return oldProd;
          }
        });

        this.deleteFromCart(product._id);
        this.setState({ products: remainingProducts });
      }
    );
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
        price: product.price,
      };
    }

    currCart.total += product.price;
    currCart.products = currProds;
    this.setState({ cart: currCart });
  }

  onCheckoutClick() {
    this.setState({ cart: { products: {}, total: 0 } });
  }

  isCartEmpty() {
    return Object.keys(this.state.cart.products).length === 0;
  }

  render() {
    return (
      <div id="app">
        <ShopHeader
          cart={this.state.cart}
          onCheckoutClick={this.onCheckoutClick.bind(this)}
          isCartEmpty={this.isCartEmpty.bind(this)}
        />
        <Products
          products={this.state.products}
          onCartAdd={this.onCartAdd.bind(this)}
          onEditProduct={this.onEditProduct.bind(this)}
          onSubmitClick={this.onSubmitClick.bind(this)}
          onProductDelete={this.onProductDelete.bind(this)}
        />
      </div>
    );
  }
}

export default App;
