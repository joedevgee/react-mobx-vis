import { configure } from "@storybook/react";
import "normalize.css/normalize.css";

// Dynamic load all stories
const req = require.context("../src/component", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
