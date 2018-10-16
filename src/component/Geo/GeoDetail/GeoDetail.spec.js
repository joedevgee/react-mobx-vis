import React from "react";
import { shallow } from "enzyme";
import GeoDetail from "./GeoDetail.jsx";

describe("<GeoDetail />", () => {
  const defaultProps = {
    place: {},
    onFetchDetail: () => {},
    onFetchAttribute: () => {}
  };
  it("renders without crashing", () => {
    shallow(<GeoDetail {...defaultProps} />);
  });
});
