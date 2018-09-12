import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import RootStore from "./store/RootStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const rootStore = new RootStore();
const app = (
  <Provider store={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
