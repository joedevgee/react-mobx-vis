import React from "react";
import { shallow } from "enzyme";
import IncomeReport from "./IncomeReport";

describe("<IncomeReport /> component", () => {
  it("Should rendering without crashing", () => {
    shallow(<IncomeReport income={[]} />);
  });
});
