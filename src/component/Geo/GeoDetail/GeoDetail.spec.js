import React from "react";
import { shallow } from "enzyme";
import GeoDetail from "./GeoDetail.jsx";

describe("<GeoDetail />", () => {
  it("renders without crashing", () => {
    const mockState = {
      display: "state"
    };
    shallow(<GeoDetail geo={mockState} />);
  });
});
