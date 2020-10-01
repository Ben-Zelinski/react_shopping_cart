import React from "react";
import { shallow } from "enzyme";
import AddProductForm from "../components/AddProduct";

describe("Add Product Form", () => {
  it("Changes the state when the product name has changed", () => {
    const wrapper = shallow(<AddProductForm />);
    const input = wrapper.find("#productTitle");
    input.simulate("change", { target: { value: "hello", id: 10 } });
    expect(wrapper.state().toBe());
  });
});
