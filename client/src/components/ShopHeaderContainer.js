import { connect } from "react-redux";
import ShopHeader from "./ShopHeader";

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckout: () => {
      dispatch({
        type: "CHECKOUT",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);
