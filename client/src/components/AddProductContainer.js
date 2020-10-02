import { connect } from "react-redux";
import AddProduct from "./AddProduct";

const mapDispatchToProps = (dispatch) => {
  return {
    onProductAdd: (data, callback) => {
      const fetchObj = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      };

      fetch("http://localhost:5000/api/products", fetchObj).then((product) => {
        product.json().then((prod) => {
          dispatch({
            type: "PRODUCT_ADDED",
            payload: {
              product: prod,
            },
          });

          callback();
        });
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddProduct);
