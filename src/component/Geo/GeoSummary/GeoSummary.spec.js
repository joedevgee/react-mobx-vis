import React from "react";
import { shallow } from "enzyme";
import GeoSummary from "./GeoSummary";

describe("<GeoSummary /> component", () => {
  const defaultProps = {
    geo: {},
    detail: {}
  };
  it("should render without crashing", () => {
    shallow(<GeoSummary {...defaultProps} />);
  });
});
