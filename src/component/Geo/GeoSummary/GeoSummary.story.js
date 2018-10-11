import React from "react";
import { storiesOf } from "@storybook/react";
import GeoSummary from "./GeoSummary";

storiesOf("GeoSummary", module).add("Default summary", () => {
  const mockDetail = {
    id: "123",
    data: {
      attribute: {
        fullName: "California",
        imageLink:
          "https://images.unsplash.com/photo-1519836744798-aaf778463745?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM3Mjg0fQ&s=754bdd5e1fbd346cf9d2ee6d8f152585"
      }
    }
  };
  return <GeoSummary detail={mockDetail} />;
});
