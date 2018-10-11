import React from "react";
import { storiesOf } from "@storybook/react";
import GeoList from "./GeoList";

storiesOf("GeoList", module).addDecorator(story => (
  <div style={{ backgroundColor: "#141b2e" }}>{story()}</div>
));
