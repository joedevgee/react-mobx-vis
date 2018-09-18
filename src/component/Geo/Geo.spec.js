import React from "react";
import { shallow } from "enzyme";
import { Geo } from "./Geo";

describe("<Geo />", () => {
  it("renders without crashing", () => {
    const mockMatch = {
      url: "mock.com"
    };
    const mockFetch = () => {};
    shallow(<Geo match={mockMatch} onFetchStates={mockFetch} />);
  });
});
