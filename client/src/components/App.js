import React from "react";
import ShopHeaderContainer from "./ShopHeaderContainer";
import Products from "./Products";
import store from "../lib/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div id="app">
        <ShopHeaderContainer />
        <Products />
      </div>
    </Provider>
  );
};

export default App;
