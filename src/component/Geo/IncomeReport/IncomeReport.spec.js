import React from "react";
import { shallow } from "enzyme";
import IncomeReport from "./IncomeReport";

describe("<IncomeReport /> component", () => {
  const defaultProps = {
    detail: {},
    usDetail: {},
    place: {},
    fetchDetail: () => {}
  };
  it("Should rendering without crashing", () => {
    shallow(<IncomeReport {...defaultProps} />);
  });
});
