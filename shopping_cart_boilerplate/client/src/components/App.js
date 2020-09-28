import React from "react";
import ShopHeader from "./ShopHeader";
import Products from "./Products";
import Data from "../lib/data";

class App extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Data });
  }

  render() {
    return (
      <div id="app">
        <ShopHeader />
        <Products products={this.state.products} />
      </div>
    );
  }
}

export default App;
