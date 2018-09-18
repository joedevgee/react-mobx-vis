import React from "react";
import { shallow } from "enzyme";
import GeoList from "./GeoList";

describe("<GeoList />", () => {
  it("renders without crashing", () => {
    const mockMatch = {
      url: "mock.com"
    };
    shallow(<GeoList match={mockMatch} list={[]} />);
  });
});
