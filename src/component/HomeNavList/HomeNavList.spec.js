import React from "react";
import { shallow } from "enzyme";
import HomeNavList from "./HomeNavList.jsx";

describe("<HomeNavList />", () => {
  it("renders without crashing", () => {
    const mockHistory = {
      push: () => {}
    };
    shallow(<HomeNavList history={mockHistory} />);
  });
});
