import { connect } from "react-redux";
import Product from "./Product";

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddToCart: () => {
      dispatch({
        type: "ADDED_TO_CART",
        payload: {
          product: ownProps.product,
        },
      });
    },

    onProductDelete: () => {
      const data = {
        method: "DELETE",
        body: JSON.stringify(ownProps.product),
        headers: { "content-type": "application/json" },
      };

      fetch(
        `http://localhost:5000/api/products/${ownProps.product._id}`,
        data
      ).then(() => {
        dispatch({
          type: "PRODUCT_DELETED",
          payload: {
            id: ownProps.product._id,
          },
        });
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
