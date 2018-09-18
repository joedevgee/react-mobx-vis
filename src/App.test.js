import React from "react";
import { shallow, mount } from "enzyme";
import { createMemoryHistory } from "history";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
