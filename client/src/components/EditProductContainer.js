import { connect } from "react-redux";
import EditProduct from "./EditProduct";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onProductEdit: (data, callback) => {
      const fetchObj = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      };

      fetch(
        `http://localhost:5000/api/products/${ownProps.product._id}`,
        fetchObj
      ).then((product) => {
        product.json().then((prod) => {
          dispatch({
            type: "PRODUCT_EDITED",
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
