import React from "react";
import { shallow } from "enzyme";
import MedianIncome from "./MedianIncome";

describe("<MedianIncome /> component", () => {
  const defaultProps = {
    income: [],
    displayName: ""
  };
  it("should render without crashing", () => {
    shallow(<MedianIncome {...defaultProps} />);
  });
});
