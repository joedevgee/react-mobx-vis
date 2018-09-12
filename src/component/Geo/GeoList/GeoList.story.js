import React from "react";
import { storiesOf } from "@storybook/react";
import GeoList from "./GeoList";

storiesOf("GeoList", module)
  .addDecorator(story => (
    <div style={{ backgroundColor: "#141b2e" }}>{story()}</div>
  ))
  .add("State list", () => {
    const stateList = [
      {
        id: "04000US06",
        name: "california",
        zValue: 4.61400499286816,
        kind: "geo",
        display: "California",
        sumLevel: "040",
        isStem: -1,
        urlName: "california"
      },
      {
        id: "04000US48",
        name: "texas",
        zValue: 2.91475545438443,
        kind: "geo",
        display: "Texas",
        sumLevel: "040",
        isStem: -1,
        urlName: "texas"
      }
    ];
    return <GeoList list={stateList} />;
  });
