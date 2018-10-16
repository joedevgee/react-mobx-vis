import React from "react";
import { shallow } from "enzyme";
import Occupation from "./Occupation";

describe("<Occupation /> component", () => {
  const defaultProps = {
    occupation: [],
    name: ""
  };
  it("should render without crashing", () => {
    shallow(<Occupation {...defaultProps} />);
  });
});
