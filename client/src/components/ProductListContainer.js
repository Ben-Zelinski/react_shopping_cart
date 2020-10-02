import { connect } from "react-redux";
import ProductList from "./ProductList";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => {
      fetch("http://localhost:5000/api/products").then((products) => {
        products.json().then((data) => {
          dispatch({
            type: "PRODUCTS_RECEIVED",
            payload: {
              products: data,
            },
          });
        });
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
